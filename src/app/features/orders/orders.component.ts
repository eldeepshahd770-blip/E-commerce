import { OrderService } from './order.service';
import { Component, signal, inject, OnInit } from '@angular/core';
import { Order } from './orders.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartsService } from '../../core/services/carts.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartsService = inject(CartsService);
  orders = signal<Order[]>([]);
  idOwner = signal<string>('');
  ngOnInit(): void {
    this.idOwner.set(this.cartsService.owner());
    if (this.idOwner() !== '') {
      this.getUserOrders(this.idOwner());
    }
  }

  getUserOrders(id: string) {
    this.orderService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.orders.set(res);
      },
    });
  }
}
