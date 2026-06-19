import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-fotget',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './fotget.component.html',
  styleUrl: './fotget.component.css',
})
export class FotgetComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step = signal<number>(1);
  email: FormControl = new FormControl('', [Validators.required]);
  code: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  newpass: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);
  allowNumbersOnly(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
  submitEmail(e: SubmitEvent): void {
    e.preventDefault();
    //send data if email valid
    if (this.email.valid) {
      const data = {
        email: this.email.value,
      };
      this.authService.forgetPassword(data).subscribe({
        next: (res) => {
          this.step.set(2);
        },
      });
    }
  }
  submitCode(e: SubmitEvent) {
    e.preventDefault();
    if (this.code.valid) {
      const data = {
        resetCode: this.code.value,
      };

      this.authService.verifyResetCode(data).subscribe({
        next: (res) => {
          this.step.set(3);
        },
      });
    }
  }
  submitPass(e: SubmitEvent) {
    e.preventDefault();
    if (this.newpass.valid) {
      const data = {
        email: this.email.value,
        newPassword: this.newpass.value,
      };
      this.authService.resetPass(data).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
