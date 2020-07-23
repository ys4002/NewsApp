import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Various services used to insert, update, retrive and delete the db data
 */
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/users/';
  feedUrl: string = 'http://localhost:8080/feed/';
  newsUrl: string = 'http://localhost:8080/news/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload)
    .pipe(catchError(this.errorHandler));
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl)
    .pipe(catchError(this.errorHandler));
  }

  registerUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8080/signup', user)
    .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id)
    .pipe(catchError(this.errorHandler));
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user)
    .pipe(catchError(this.errorHandler));
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user)
    .pipe(catchError(this.errorHandler));
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  createFeed(feed): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.feedUrl, feed)
    .pipe(catchError(this.errorHandler));
  }

  deleteFeed(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.feedUrl)
    .pipe(catchError(this.errorHandler));
  }

  getCategory(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.newsUrl+"getcategory")
    .pipe(catchError(this.errorHandler));
  }

  getNews(category): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.newsUrl+category)
    .pipe(catchError(this.errorHandler));
  }

  updateCount(id): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.newsUrl+"count/"+id)
    .pipe(catchError(this.errorHandler));
  }

  fetchAllNews(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.newsUrl+"count")
    .pipe(catchError(this.errorHandler));
  }
}
