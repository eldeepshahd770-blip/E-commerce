import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  fullName = signal<string>('Usama');
  email = signal<string>('');
  phone = signal<string>('01xxxxxxxxx');

  // --- Account Info State ---
  userId = signal<string>('*****************');
  userRole = signal<string>('User');

  // --- Password Visibility State ---
  showCurrentPassword = signal<boolean>(false);
  showNewPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  // --- Methods ---
  toggleCurrentPassword() {
    this.showCurrentPassword.update((v) => !v);
  }

  toggleNewPassword() {
    this.showNewPassword.update((v) => !v);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update((v) => !v);
  }

  saveProfile() {
    console.log('Profile saved!', {
      name: this.fullName(),
      email: this.email(),
      phone: this.phone(),
    });
  }

  changePassword() {
    console.log('Password change requested');
  }
}
