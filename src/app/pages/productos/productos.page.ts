import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonBackButton, IonSpinner, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButtons, IonBackButton, IonSpinner, IonCard, 
    IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  
  products: Product[] = [];
  total = 0;
  limit = 5; // Productos por página
  skip = 0;  // Desplazamiento inicial
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.limit, this.skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los productos.';
        this.loading = false;
      }
    });
  }

  // Métodos para la Paginación (Reto)
  nextPage(): void {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.skip - this.limit >= 0) {
      this.skip -= this.limit;
      this.loadProducts();
    }
  }

  // Cálculo del Stock Valorado: (unidades * precio) - descuento aplicable
  calcularStockValorado(product: Product): number {
    const subtotal = product.stock * product.price;
    const descuento = subtotal * (product.discountPercentage / 100);
    return subtotal - descuento;
  }
}