import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap, shareReplay } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  private cache = new Map<string, ProductsResponse>();
  private inFlight = new Map<string, Observable<ProductsResponse>>();

  getProducts(limit = 10, skip = 0): Observable<ProductsResponse> {
    const key = `${limit}-${skip}`;

    if (this.cache.has(key)) {
      return of(this.cache.get(key)!);
    }

    if (this.inFlight.has(key)) {
      return this.inFlight.get(key)!;
    }

    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    const req$ = this.http.get<ProductsResponse>(this.apiUrl, { params }).pipe(
      tap(res => this.cache.set(key, res)),
      shareReplay(1)
    );

    this.inFlight.set(key, req$);
    req$.subscribe({
      next: () => this.inFlight.delete(key),
      error: () => this.inFlight.delete(key)
    });

    return req$;
  }
}