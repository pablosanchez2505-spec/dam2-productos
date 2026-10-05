import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonItem, IonLabel, IonToggle 
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonItem, IonLabel, IonToggle, 
    RouterLink
  ]
})
export class InicioPage {

  // Método que activa o desactiva el modo oscuro
  toggleDarkMode(event: any): void {
    const isDark = event.detail.checked;
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
  }

}