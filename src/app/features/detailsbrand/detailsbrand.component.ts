import { Component, inject, OnInit, signal } from '@angular/core';
import { Brands } from '../../core/models/models/brands.interface';
import { Product } from '../../core/models/models/product.interface';
import { BrandsService } from '../../core/services/brands.service';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RateComponent } from '../rate/rate.component';
import { CartsService } from '../../core/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-detailsbrand',
  imports: [RateComponent, RouterLink],
  templateUrl: './detailsbrand.component.html',
  styleUrl: './detailsbrand.component.css',
})
export class DetailsbrandComponent implements OnInit {
  private readonly cartsService = inject(CartsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  brandId = signal('');
  specificbrand = signal<Brands>({} as Brands);
  brandProducts = signal<Product[]>([]);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.brandId.set(id);
      this.getSpecificBrand(id);
    });
  }

  getSpecificBrand(brandId: string) {
    this.brandsService.getspecificBrand(brandId).subscribe((res) => {
      this.specificbrand.set(res.data);
      this.getProductsByBrand();
    });
  }

  getProductsByBrand(): void {
    this.productsService.getAllProductsbybrand(this.brandId()).subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandProducts.set(res.data);
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
