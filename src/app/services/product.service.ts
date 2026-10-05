import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(limit: number = 10, skip: number = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  }
}