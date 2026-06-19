import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  // private readonly httpClient = inject(HttpClient);
  // addProductToCart(prodId: string): Observable<any> {
  //   return this.httpClient.post(environment.baseUrl + `api/v1/cart`, { productId: prodId });
  // }
  private readonly httpClient = inject(HttpClient);
  getAllBrands(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/brands`);
  }
  getspecificBrand(brandId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/brands/${brandId}`);
  }
}
