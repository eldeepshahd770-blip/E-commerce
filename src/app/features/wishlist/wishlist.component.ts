import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { Wishlist } from './wishlist.interface';
import { CartsService } from '../../core/services/carts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly cartsService = inject(CartsService);
  private readonly toastrService = inject(ToastrService);

  wishlistDetails = signal<Wishlist>([] as Wishlist);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getWishlistForLoggedUser();
    }
  }

  getWishlistForLoggedUser() {
    this.wishlistService.getWishlistForLoggedUser().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlistDetails.set(res.data);
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
  removeItem(id: string): void {
    this.wishlistService.removeItemFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.wishListCount.set(res.count);
        this.wishlistDetails.set(
          this.wishlistDetails().filter((item) => res.data.includes(item._id)),
        );
      },
    });
  }
}
