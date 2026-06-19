import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly httpClient = inject(HttpClient);
  getUserOrders(ownerId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/orders/user/${ownerId}`);
  }
}
