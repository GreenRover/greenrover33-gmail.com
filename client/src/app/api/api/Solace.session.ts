import { SBB_DMZ_BROKER } from '../variables';
import { Injectable, Inject } from '@angular/core';
import { range, Observable, Observer } from 'rxjs';

declare const solace: any;

export interface SessionProperties {
  url: string;
  vpnName: string;
  userName: string;
  password: string;
}

@Injectable()
export class SolaceSession {
  private session;
  private subscriptions = new Map<string, (data: string) => void>();
  private wildcardSubscriptions = new Map<string, (data: string) => void>();

  constructor(@Inject(SBB_DMZ_BROKER) sessionProperties: SessionProperties) {
    solace.SessionProperties.connectTimeoutInMsecs = 30 * 1000;
    solace.SessionProperties.connectRetries = 5;
    solace.SessionProperties.reconnectRetries = 3;
    solace.SessionProperties.reconnectRetryWaitInMsecs = 10 * 1000;
    solace.SolclientFactory.setLogLevel(solace.LogLevel.DEBUG);

    try {
      this.session = solace.SolclientFactory.createSession(sessionProperties);

      this.session.on(solace.SessionEventCode.UP_NOTICE, (sessionEvent) => {
        console.log('=== Successfully connected and ready to subscribe. ===');
      });
      this.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, (sessionEvent) => {
        console.log('Connection failed to the message router: ' + sessionEvent.infoStr +
          ' - check correct parameter values and connectivity!');
      });

      this.session.on(solace.SessionEventCode.MESSAGE, message => {
        const msg = message.getBinaryAttachment();
        const topic: string = message.getDestination().getName();

        const handler = this.subscriptions.get(topic);
        if (handler !== undefined) {
          handler(msg);
        }

        this.wildcardSubscriptions.forEach((wHandler, topicWildcard) => {
          if (topic.length >= topicWildcard.length &&
            topic.substr(0, topicWildcard.length) === topicWildcard) {
            wHandler(msg);
          }
        });
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  public subcribeTopicCb(topic: string, callback: (data: string) => void, errCallback?: (err: any) => void) {
    if (topic.indexOf('+') !== -1) {
      throw new Error('Invalid topic, found a *, only full match and begins with (ending with >) are permitted');
    }

    if (topic.charAt(topic.length - 1) === '>') {
      // Only ending with wildcard is supported.
      this.wildcardSubscriptions.set(topic.substr(0, topic.length - 2), callback);
    } else {
      this.subscriptions.set(topic, callback);
    }

    try {
      this.session.subscribe(
        solace.SolclientFactory.createTopicDestination(topic),
        true, // generate confirmation when subscription is added successfully
        topic, // use topic name as correlation key
        10000 // 10 seconds timeout for this operation
      );
    } catch (error) {
      if (errCallback !== undefined) {
        errCallback(error);
      }
    }
  }

  public subcribeTopic(topic: string): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      try {
        this.subcribeTopicCb(topic, (data) => {
          observer.next(data);
        }, (err) => {
          observer.error(err);
        });
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public publish(topicName: string, content: string) {
    if (this.session !== null) {
      const message = solace.SolclientFactory.createMessage();
      message.setDestination(solace.SolclientFactory.createTopicDestination(topicName));
      message.setBinaryAttachment(content);
      message.setDeliveryMode(solace.MessageDeliveryModeType.PERSISTED);
      console.log('Publishing message "' + content + '" to topic "' + topicName + '"...');
      try {
        this.session.send(message);
        console.log('Message published.');
      } catch (error) {
        console.log(error.toString());
      }
    } else {
      console.log('Cannot publish because not connected to Solace message router.');
    }
  }

  public disconnect() {
    console.log('Disconnecting from Solace message router...');
    if (this.session !== null) {
      try {
        this.session.disconnect();
      } catch (error) {
        console.log(error.toString());
      }
    } else {
      console.log('Not connected to Solace message router.');
    }
  }
}