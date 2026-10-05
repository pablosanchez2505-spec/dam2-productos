import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonSpinner, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonButton,
  IonBadge, IonGrid, IonRow, IonCol
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonSpinner, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    IonBadge, IonGrid, IonRow, IonCol
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  loading = false;
  error: string | null = null;

  limit = 10;
  skip = 0;
  total = 0;

  get page(): number {
    return this.skip / this.limit + 1;
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  ngOnInit() {
    console.log('ngOnInit de ProductosPage');
    this.loadProducts();
  }

  loadProducts() {
    console.log('loadProducts llamado, skip =', this.skip);
    this.loading = true;
    this.error = null;

    this.productService.getProducts(this.limit, this.skip).subscribe({
      next: (res: ProductsResponse) => {
        console.log('Respuesta recibida:', res);
        this.products = res.products;
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error en la peticion:', err);
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }

  nextPage() {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.skip > 0) {
      this.skip -= this.limit;
      this.loadProducts();
    }
  }

  totalStockValue(p: Product): number {
    return p.stock * p.price * (1 - p.discountPercentage / 100);
  }
}