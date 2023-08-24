import { UsersService } from './../../../services/user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UsersService, useValue: spy }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    // Arrange - Act
    component.emailField?.setValue('esto no es un correo');
    // Assert
    expect(component.emailField?.invalid).withContext("wrong email").toBeTruthy();
    // Arrange - Act
    component.emailField?.setValue('');
    // Assert
    expect(component.emailField?.invalid).withContext("empty email").toBeTruthy();
  });

  it('should the passwordField be invalid', () => {
    // Arrange - Act
    component.passwordField?.setValue('');
    // Assert
    expect(component.passwordField?.invalid).withContext("empty").toBeTruthy();
    // Arrange - Act
    component.passwordField?.setValue('12345');
    // Assert
    expect(component.passwordField?.invalid).withContext("five characters").toBeTruthy();
    // Arrange - Act
    component.passwordField?.setValue('sfdasahsash');
    // Assert
    expect(component.passwordField?.invalid).withContext("without number").toBeTruthy();
    // Arrange - Act
    component.passwordField?.setValue('sfdas1ahsash');
    // Assert
    expect(component.passwordField?.valid).withContext("rigth").toBeTruthy();
  });

  it('should the form be invalid', () => {
    // Arrange - Act
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmail.com',
      password: 'nico12345',
      confirmPassword: 'nico12345',
      checkTerms: false
    });
    // Assert
    expect(component.form.invalid).toBeTruthy();
  });
});
