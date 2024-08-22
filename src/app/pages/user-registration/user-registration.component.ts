import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],

  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent implements OnInit {
  UserRegistrationForm!: FormGroup;
  constructor(private fb: FormBuilder, private masterService: MasterService) {}

  ngOnInit(): void {
    this.UserRegistrationForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: [{ value: '', disabled: true }, Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  setFullName(name: string): void {
    const firstName = this.UserRegistrationForm.controls['firstName'].value;
    const middleName = this.UserRegistrationForm.controls['middleName'].value;
    const lastName = this.UserRegistrationForm.controls['lastName'].value;
    const fullName = firstName + ' ' + middleName + ' ' + lastName;
    this.UserRegistrationForm.controls['fullName'].setValue(fullName);
  }

  getPinCode() {
    // API call to get pin code
    this.masterService
      .getPinCode(this.UserRegistrationForm.controls['city'].value)
      .subscribe((res) => {
        this.UserRegistrationForm.controls['zip'].setValue(res.Pincode);
      });
  }

  isControlValid(controlName: string): any {
    const control = this.UserRegistrationForm.get(controlName);

    if (control && control.touched && control.invalid) {
      return this.UserRegistrationForm.controls[controlName]?.valid;
    }

    return true;
  }

  registerUser() {
    if (this.UserRegistrationForm.invalid) {
      this.UserRegistrationForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }
  }
}
