import { WishlistService } from './../../core/services/wishlist.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Cats } from '../../core/models/models/cats.interface';
import { Product } from '../../core/models/models/product.interface';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RateComponent } from '../rate/rate.component';
import { CartsService } from '../../core/services/carts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-cats',
  imports: [RateComponent, RouterLink],
  templateUrl: './details-cats.component.html',
  styleUrl: './details-cats.component.css',
})
export class DetailsCatsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartsService = inject(CartsService);
  private readonly toastrService = inject(ToastrService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly wishlistService = inject(WishlistService);
  catId = signal('');
  specificcategry = signal<Cats>({} as Cats);
  categryProducts = signal<Product[]>([]);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      console.log(params);
      this.catId.set(id);
      this.getSpecficCats(id);
    });
  }
  getSpecficCats(catId: string) {
    this.categoriesService.getSpecificCats(catId).subscribe({
      next: (res) => {
        console.log(res);
        this.specificcategry.set(res.data);
        this.getProducts();
      },
    });
  }
  getProducts() {
    this.productsService.getAllProductByCats(this.catId()).subscribe({
      next: (res) => {
        console.log(res);
        this.categryProducts.set(res.data);
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
          this.toastrService.warning('Error', 'FreshCart');
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
