import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{3,16}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmitRegist() {

    if (this.registerForm.valid) {
      if (this.registerForm.get('password').value !== this.registerForm.get('repeatPassword').value) {
        return this.toastr.error('Oh! Incorrect re-password value entered!');
      }
      this.spinner.show();
      this.auth.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
        (res: boolean) => {
        if (res) {
          this.router.navigate(['/']);
          this.auth.emitLoginEvent(this.auth.isAuth);
          this.toastr.success('Registration was successful!!!','Success');
          this.registerForm.reset();
        }
      }, ({error}) => {
        this.spinner.hide();
        this.toastr.error(error);
      });
    } else {
      this.toastr.error('Please, enter the correct data...');
    }
  }

  onBlur(name: string): void {
    const input = this.registerForm.get(name);
    if (input.invalid) {
      this.toastr.warning(`${name} - is ${input.value ? 'invalid' : 'required'}`);
    }
  }

}
