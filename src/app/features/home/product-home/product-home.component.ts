import { CartsService } from './../../../core/services/carts.service';
import {
  Component,
  inject,
  OnInit,
  signal,
  ɵresetIncrementalHydrationEnabledWarnedForTests,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/models/product.interface';
import { RouterLink } from '@angular/router';
import { RateComponent } from '../../rate/rate.component';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-home',
  imports: [RouterLink, RateComponent],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.css',
})
export class ProductHomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartsService = inject(CartsService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
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
