import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  islogged = signal<boolean>(false);

  signOut(): void {
    localStorage.removeItem('eToken');
    this.islogged.set(false);
    this.router.navigate(['/login']);
  }

  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signup`, data);
  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signin`, data);
  }
  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/forgotPasswords`, data);
  }
  verifyResetCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/verifyResetCode`, data);
  }
  resetPass(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/auth/resetPassword`, data);
  }
}
