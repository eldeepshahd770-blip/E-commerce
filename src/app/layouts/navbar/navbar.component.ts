import { FlowbiteService } from './../../core/services/flowbite.service';
import { CategoriesService } from './../../core/services/categories.service';
import {
  AfterViewInit,
  Component,
  computed,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cats } from '../../core/models/models/cats.interface';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { CartsService } from '../../core/services/carts.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly authService = inject(AuthService);
  private readonly cartsService = inject(CartsService);
  private readonly wishlistService = inject(WishlistService);
  private get html() {
    return document.documentElement;
  }
  name: string = '';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private flowbiteService: FlowbiteService,
  ) {}
  logged = computed(() => this.authService.islogged());
  count = computed(() => this.cartsService.cartCount());
  countWish = computed(() => this.wishlistService.wishListCount());
  cats = signal<Cats[]>([]);
  isDark = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.flowbiteService.loadFlowbite(() => {
        initFlowbite();
      });
    }, 0);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('eUser');
      this.getCartCount();
      this.getwishCount();
      this.name = user ? JSON.parse(user).name : '';
      if (localStorage.getItem('eToken')) {
        this.authService.islogged.set(true);
      }
      const saved = localStorage.getItem('theme');

      if (saved === 'dark') {
        this.html.classList.add('dark');
        this.isDark = true;
      } else {
        this.isDark = false;
      }
    }

    this.getCatsName();
  }

  toggleDarkMode() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.html.classList.toggle('dark');

    this.isDark = this.html.classList.contains('dark');
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
  getCartCount() {
    this.cartsService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);
        this.cartsService.cartCount.set(res.numOfCartItems);
      },
    });
  }
  getwishCount() {
    this.wishlistService.getWishlistForLoggedUser().subscribe({
      next: (res) => {
        console.log(res.count);
        this.wishlistService.wishListCount.set(res.count);
      },
    });
  }
  getCatsName() {
    this.categoriesService.getAllCats().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cats.set(res.data);
      },
    });
  }
  logOut(): void {
    this.authService.signOut();
  }
}
