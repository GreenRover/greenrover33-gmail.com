/**
 * RoalerCoster
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: max@muster.de
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Coaster } from '../model/coaster';
import { GenericError } from '../model/genericError';
import { HavingPK } from '../model/havingPK';
import { PageHavingPK } from '../model/pageHavingPK';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CoasterService {

    protected basePath = 'http://localhost:8038';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     *
     * Delete an object
     * @param id The id of the object to delete.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public delete(id: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public delete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public delete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public delete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling _delete.');
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
        ];

        return this.httpClient.request<string>('delete',`${this.basePath}/coaster/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Return JSON of a static coaster.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public coasterStatic(observe?: 'body', reportProgress?: boolean): Observable<Coaster>;
    public coasterStatic(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Coaster>>;
    public coasterStatic(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Coaster>>;
    public coasterStatic(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        ];

        return this.httpClient.request<Coaster>('get',`${this.basePath}/coaster/static`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Create new object
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public create(body: Coaster, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public create(body: Coaster, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public create(body: Coaster, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public create(body: Coaster, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling create.');
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

        return this.httpClient.request<string>('post',`${this.basePath}/coaster`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Get single object
     * @param id The id to get.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public get(id: number, observe?: 'body', reportProgress?: boolean): Observable<Coaster>;
    public get(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Coaster>>;
    public get(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Coaster>>;
    public get(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling get.');
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
        ];

        return this.httpClient.request<Coaster>('get',`${this.basePath}/coaster/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Receive a list of objects
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public list(observe?: 'body', reportProgress?: boolean): Observable<Array<HavingPK>>;
    public list(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<HavingPK>>>;
    public list(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<HavingPK>>>;
    public list(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        ];

        return this.httpClient.request<Array<HavingPK>>('get',`${this.basePath}/coaster`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Receive a list of objects, paged
     * @param page The page to show.
     * @param items The items per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public paged(page: number, items: number, observe?: 'body', reportProgress?: boolean): Observable<PageHavingPK>;
    public paged(page: number, items: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageHavingPK>>;
    public paged(page: number, items: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageHavingPK>>;
    public paged(page: number, items: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (page === null || page === undefined) {
            throw new Error('Required parameter page was null or undefined when calling paged.');
        }

        if (items === null || items === undefined) {
            throw new Error('Required parameter items was null or undefined when calling paged.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (items !== undefined && items !== null) {
            queryParameters = queryParameters.set('items', <any>items);
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
        ];

        return this.httpClient.request<PageHavingPK>('get',`${this.basePath}/coaster/paged`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Parse rcdb.com and save to database.
     * @param from The id of the first page, to scrape.
     * @param to The id of the last page, to scrape.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scrapeCoasterToDb(from: number, to: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Coaster>>;
    public scrapeCoasterToDb(from: number, to: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Coaster>>>;
    public scrapeCoasterToDb(from: number, to: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Coaster>>>;
    public scrapeCoasterToDb(from: number, to: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling scrapeCoasterToDb.');
        }

        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling scrapeCoasterToDb.');
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
        ];

        return this.httpClient.request<Array<Coaster>>('get',`${this.basePath}/coaster/scrape/${encodeURIComponent(String(from))}/${encodeURIComponent(String(to))}/toDb`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Parse rcdb.com
     * @param from The id of the first page, to scrape.
     * @param to The id of the last page, to scrape.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scrapeCoasterToDisplay(from: number, to: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Coaster>>;
    public scrapeCoasterToDisplay(from: number, to: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Coaster>>>;
    public scrapeCoasterToDisplay(from: number, to: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Coaster>>>;
    public scrapeCoasterToDisplay(from: number, to: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (from === null || from === undefined) {
            throw new Error('Required parameter from was null or undefined when calling scrapeCoasterToDisplay.');
        }

        if (to === null || to === undefined) {
            throw new Error('Required parameter to was null or undefined when calling scrapeCoasterToDisplay.');
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
        ];

        return this.httpClient.request<Array<Coaster>>('get',`${this.basePath}/coaster/scrape/${encodeURIComponent(String(from))}/${encodeURIComponent(String(to))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     * Update an object
     * @param body
     * @param id The id of the object to update.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public update(body: Coaster, id: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public update(body: Coaster, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public update(body: Coaster, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public update(body: Coaster, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling update.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling update.');
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

        return this.httpClient.request<string>('put',`${this.basePath}/coaster/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}