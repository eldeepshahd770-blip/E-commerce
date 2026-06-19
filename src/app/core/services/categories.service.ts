import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);
  getAllCats(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories`);
  }
  getSpecificCats(idCat: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${idCat}`);
  }
}
