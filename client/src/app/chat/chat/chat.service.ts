import { Observable, Observer } from 'rxjs';
import { Configuration } from './../../api/configuration';
import { BASE_PATH } from './../../api/variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessage } from './chat.message';
import { Inject, Injectable, Optional } from '@angular/core';


@Injectable()
export class ChatService {

  protected basePath = 'http://localhost:8038';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }

  }

  getFluxMessages(): Observable<ChatMessage> {
    return Observable.create((sink: Observer<ChatMessage>) => {
      const eventSource = new EventSource(`${this.basePath}/chat`);
      eventSource.onmessage = (event) => {
        console.log("event = ", event);
        sink.next(JSON.parse(event.data));
      };
    });
  }

  saveChatMessage(chatMessage: ChatMessage) {

    if (chatMessage === null || chatMessage === undefined) {
      throw new Error('Required parameter chatMessage was null or undefined when calling saveChatMessage.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<string>('post', `${this.basePath}/chat/save`,
      {
        body: chatMessage,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      }).toPromise().then((ttt) => {});
  }
}
