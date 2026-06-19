import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishListCount = signal<number>(0);

  private readonly httpClient = inject(HttpClient);
  removeItemFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/wishlist/${id}`);
  }
  addProductToWishlist(prodId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/wishlist`, { productId: prodId });
  }
  getWishlistForLoggedUser(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/wishlist`);
  }
}
