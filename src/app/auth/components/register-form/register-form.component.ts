import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MyValidators } from './../../../utils/validators';

import { UsersService } from './../../../services/user.service';
import { CreateUserDTO } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value:CreateUserDTO = this.form.value;
      value.avatar ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-CujXEB_pHNjg6VnEKrUJW-sgY-6glbQhw&usqp=CAU";
      this.usersService.create(value)
      .subscribe((rta) => {
        console.log(rta);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
