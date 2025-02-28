import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/enviroment.prod';
  
export interface ApiResponse<T> {
  error: any;
  status_code: number;
  data: T;
  result: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = environment.apiUrl;

  constructor(
    private httpClient: HttpClient, 
  ) { }

  getFromApi(path: string) {
    return this.httpClient.get<ApiResponse<any>>(
      `${path}`
    );
  }

 
  get(path: string, params?: any) {
    return this.httpClient.get<ApiResponse<any>>(
      `${this.API_URL}${path}`
    );
  }

  post(path: string, body: any) {
    return this.httpClient.post<ApiResponse<any>>(
      `${this.API_URL}/${path}`,
      body
    );  
    
  }

  
}
