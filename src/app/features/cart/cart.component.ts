import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartsService } from '../../core/services/carts.service';
import { Cartdetails } from './models/cartdetails.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartsService = inject(CartsService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  cartDetails = signal<Cartdetails>({} as Cartdetails);
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getLoggedUserProduct();
    }
  }
  getLoggedUserProduct() {
    this.cartsService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
      },
    });
  }
  deleteSpacificproduct(id: string): void {
    this.cartsService.removeSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartsService.cartCount.set(res.numOfCartItems);
        this.cartDetails.set(res.data);
      },
    });
  }
  Updatecartproductquantity(id: string, count: number) {
    this.cartsService.Updatecartproductquantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }
  clearAllCart() {
    this.cartsService.clearCarts().subscribe({
      next: (res) => {
        console.log(res);
        this.cartsService.cartCount.set(res.numOfCartItems);
        this.cartDetails.set({} as Cartdetails);
      },
    });
  }
}
