import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
    title: 'Fresh Cart | Home',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shops/shops.component').then((c) => c.ShopsComponent),
    title: 'Fresh Cart | Shop',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
    title: 'Fresh Cart | Categories',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((c) => c.BrandsComponent),
    title: 'Fresh Cart | Brands',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
    title: 'Fresh Cart | Cart',
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
    title: 'Fresh Cart | Wish List',
    canActivate: [authGuard],
  },
  {
    path: 'detailsbrand/:id/:slug',
    loadComponent: () =>
      import('./features/detailsbrand/detailsbrand.component').then((c) => c.DetailsbrandComponent),
    title: 'Fresh Cart | Details Brands',
  },
  {
    path: 'checkout/:id/:idOwner',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
    title: 'Fresh Cart | CheckOut',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((c) => c.OrdersComponent),
    title: 'Fresh Cart | Orders',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent),
    title: 'Fresh Cart | LogIn',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((c) => c.RegisterComponent),
    title: 'Fresh Cart | Register',
  },
  {
    path: 'detailsCats/:id/:slug',
    loadComponent: () =>
      import('./features/details-cats/details-cats.component').then((c) => c.DetailsCatsComponent),
    title: 'Fresh Cart | Categories Detials',
  },
  {
    path: 'fotget',
    loadComponent: () =>
      import('./features/fotget/fotget.component').then((c) => c.FotgetComponent),
    title: 'Fresh Cart | Forget Password',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Fresh Cart | Profile',
  },
  {
    path: 'detials/:id/:slug',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent,
      ),
    title: 'Fresh Cart | Product Details',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfoundpage/notfoundpage.component').then((c) => c.NotfoundpageComponent),
    title: 'That is Not found page',
  },
];
