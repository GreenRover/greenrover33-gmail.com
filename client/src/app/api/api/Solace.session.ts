import { SBB_DMZ_BROKER } from '../variables';
import { Injectable, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as solace from 'solclientjs/lib-browser/solclient-debug.js';

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
  private whenConnected: Promise<any>;

  constructor(@Inject(SBB_DMZ_BROKER) sessionProperties: SessionProperties) {
    solace.SessionProperties.connectTimeoutInMsecs = 30 * 1000;
    solace.SessionProperties.connectRetries = 5;
    solace.SessionProperties.reconnectRetries = 3;
    solace.SessionProperties.reconnectRetryWaitInMsecs = 10 * 1000;
    solace.SolclientFactory.setLogLevel(solace.LogLevel.DEBUG);

    try {
      const factoryProps = new solace.SolclientFactoryProperties();
      solace.SolclientFactory.init(factoryProps);

      this.session = solace.SolclientFactory.createSession(sessionProperties);

      this.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, (sessionEvent) => {
        console.log('Connection failed to the message router: ' + sessionEvent.infoStr +
          ' - check correct parameter values and connectivity!');
      });

      this.whenConnected = new Promise((resolve, reject) => {
        try {
          this.session.on(solace.SessionEventCode.UP_NOTICE, (sessionEvent) => {
            resolve();
            console.log('=== Successfully connected and ready to subscribe. ===');
          });
          this.session.connect();
        } catch (e) {
          reject(e);
        }
      });

      this.session.on(solace.SessionEventCode.MESSAGE, message => {
        let msg: string;
        if (message.getType() === solace.MessageType.TEXT) {
          msg = message.getSdtContainer().getValue();
        } else if (message.getType() === solace.MessageType.BINARY) {
          msg = message.getBinaryAttachment();
        } else {
          console.error('Only able to handle solace text msgs');
          console.log(message);
        }

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
    if (topic.indexOf('*') !== -1) {
      throw new Error('Invalid topic, found a *, only full match and begins with (ending with >) are permitted');
    }

    if (topic.charAt(topic.length - 1) === '>') {
      // Only ending with wildcard is supported.
      this.wildcardSubscriptions.set(topic.substr(0, topic.length - 2), callback);
    } else {
      this.subscriptions.set(topic, callback);
    }

    this.whenConnected.then(() => {
      this.subscribeTopic(topic, errCallback);
    });
  }

  private subscribeTopic(topic, errCallback) {
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
      return () => {
        this.unsubscribe(topic);
      };
    });
  }
  unsubscribe(topic: string) {
    this.session.unsubscribe(solace.SolclientFactory.createTopicDestination(topic),
      true, // generate confirmation when subscription is added successfully
      topic, // use topic name as correlation key
      10000 // 10 seconds timeout for this operation
    );
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
