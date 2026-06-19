import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  getAllProducts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products`);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products/${productId}`);
  }
  getAllProductsbybrand(brandId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products?brand=${brandId}`);
  }
  getAllProductByCats(catId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products?category[in]=${catId}`);
  }
}
