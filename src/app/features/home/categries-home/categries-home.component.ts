import { CategoriesService } from './../../../core/services/categories.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { signalGetFn } from '@angular/core/primitives/signals';
import { RouterLink } from '@angular/router';
import { Cats } from '../../../core/models/models/cats.interface';

@Component({
  selector: 'app-categries-home',
  imports: [RouterLink],
  templateUrl: './categries-home.component.html',
  styleUrl: './categries-home.component.css',
})
export class CategriesHomeComponent implements OnInit {
  private readonly catsService = inject(CategoriesService);
  catsList = signal<Cats[]>([]);
  ngOnInit(): void {
    this.getAlldataCat();
  }
  getAlldataCat(): void {
    this.catsService.getAllCats().subscribe({
      next: (res) => {
        console.log(res.data, 'cats');
        this.catsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
