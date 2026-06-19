import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/models/product.interface';
import { RateComponent } from '../rate/rate.component';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartsService } from '../../core/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shops',
  imports: [RateComponent, RouterLink],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
})
export class ShopsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartsService = inject(CartsService);
  private readonly toastrService = inject(ToastrService);

  productList = signal<Product[]>([]);
  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCarts(iD: string) {
    this.cartsService.addProductToCart(iD).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.cartsService.cartCount.set(res.numOfCartItems);
          this.toastrService.success(res.message, 'FreshCart');
        } else {
          this.toastrService.warning('Login First', 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishList(id: string) {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.wishlistService.wishListCount.set(res.data.length);
          this.toastrService.success(res.message, 'FreshCart');
        } else {
          this.toastrService.warning('Login First', 'FreshCart');
        }
      },
    });
  }
}
