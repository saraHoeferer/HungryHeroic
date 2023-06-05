import { Component } from '@angular/core';
import { ProductDisplay } from '../product-display';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  productDisplayList: ProductDisplay[] = [
    {
    id: 1,
    name: "Test Produkt",
    icon: "fa-solid fa-carrot fa-4x",
    expiryDate: '12.12.1999',
    purchaseDate: '10.12.1999',
    progress: 75,
    color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-bacon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-bacon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-regular fa-lemon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-wine-bottle fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-shrimp fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-bacon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-regular fa-lemon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-carrot fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-shrimp fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-regular fa-lemon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-bacon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-wine-bottle fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-shrimp fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-carrot fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-bacon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-shrimp fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-regular fa-lemon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-regular fa-lemon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-carrot fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 40,
      color: "warning"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-carrot fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-regular fa-lemon fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-shrimp fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-carrot fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 75,
      color: "success"
    },
    {
      id: 1,
      name: "Test Produkt",
      icon: "fa-solid fa-shrimp fa-4x",
      expiryDate: '12.12.1999',
      purchaseDate: '10.12.1999',
      progress: 10,
      color: "danger"
    },

  ];
}
