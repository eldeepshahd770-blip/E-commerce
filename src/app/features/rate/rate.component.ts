import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rate',
  imports: [],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css',
})
export class RateComponent {
  rating = input<number>(0); // ✅ signal input

  stars = computed(() => {
    const value = this.rating();
    const stars: string[] = [];

    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars.push('full');
      } else if (value >= i - 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }

    return stars;
  });
}
