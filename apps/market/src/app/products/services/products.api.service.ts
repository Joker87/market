import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable()
export class ProductsApiService {

  constructor(private _http: HttpClient) {
  }

  fetchProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('/joker-87.github.io/assets/mocks/products.json');
  }
}
