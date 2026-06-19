import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../core/models/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { RateComponent } from '../rate/rate.component';
import { ToastrService } from 'ngx-toastr';
import { CartsService } from '../../core/services/carts.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [RateComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartsService = inject(CartsService);
  private readonly toastrService = inject(ToastrService);

  productdetials = signal<Product>({} as Product);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getProductDetials(params.get('id')!);
    });
  }
  getProductDetials(productId: string): void {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.productdetials.set(res.data);
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
