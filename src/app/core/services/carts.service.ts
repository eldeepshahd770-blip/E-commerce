import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  cartCount = signal<number>(0);
  owner = signal<string>('');
  private readonly httpClient = inject(HttpClient);
  addProductToCart(prodId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/cart`, { productId: prodId });
  }
  removeSpecificProduct(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/cart/${id}`);
  }
  clearCarts(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/cart`);
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/cart`);
  }

  Updatecartproductquantity(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/cart/${id}`, { count: count });
  }
  payWithCash(id: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/orders/${id}`, data);
  }
  payWithVisa(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `/api/v1/orders/checkout-session/${id}?url=${environment.url}`,
      data,
    );
  }
}
