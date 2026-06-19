import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartsService } from '../../core/services/carts.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly cartsService = inject(CartsService);
  private readonly router = inject(Router);
  checkoutForm: FormGroup = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
    }),
  });
  cardId = signal<string>('');
  idOwner = signal<string>('');

  flag = signal<string>('cash');
  ngOnInit(): void {
    this.getCardId();
    this.getOwnerId();
  }
  getCardId() {
    this.activatedRoute.paramMap.subscribe({
      next: (par) => {
        par.get('id');
        this.cardId.set(par.get('id')!);
        console.log(par.get('id'));
      },
    });
  }
  getOwnerId() {
    this.activatedRoute.paramMap.subscribe({
      next: (par) => {
        par.get('idOwner');
        this.idOwner.set(par.get('idOwner')!);
        console.log(par.get('idOwner'));
        this.cartsService.owner.set(this.idOwner());
      },
    });
  }
  submitForm() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
      // call api cash or visa
      if (this.flag() === 'cash') {
        console.log('cash');
        this.cartsService.payWithCash(this.cardId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              this.router.navigate(['/allorders']);
            }
          },
        });
      } else {
        console.log('card');
        this.cartsService.payWithVisa(this.cardId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              window.open(res.session.url, '_blank');
            }
          },
        });
      }
    }
  }
  changeFlage(ref: HTMLInputElement): void {
    this.flag.set(ref.value);
  }
}
