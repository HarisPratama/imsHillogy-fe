import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from 'src/app/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(payload: LoginPayload) {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/api/login`, payload)
  }

  register(payload: RegisterPayload) {
    return this.httpClient.post<RegisterResponse>(`${environment.apiUrl}/api/register`, payload)
  }
}
