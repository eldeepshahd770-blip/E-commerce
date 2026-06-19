import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Cats } from '../../core/models/models/cats.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categories = signal<Cats[]>([]);
  ngOnInit(): void {
    this.getAllCats();
  }
  getAllCats() {
    this.categoriesService.getAllCats().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
