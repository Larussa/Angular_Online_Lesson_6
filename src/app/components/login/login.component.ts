import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.auth.isAuth) this.router.navigate(['/']);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }
  onSubmit() {
    if (this.loginForm.invalid)return;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: boolean ) => {
      if (res) {
        this.router.navigate(['/']);
        this.auth.emitLoginEvent('true');
      }
    }, ({error, status}) => {
      this.toastr.error(`${status}:${error}`,'Error');
    });
  }

  onBlur(name: string): void {
    const input = this.loginForm.get(name);
    if (this.loginForm.get(name).invalid) {
      this.toastr.warning(`${name} - is ${input.value ? 'invalid' : 'required'}`);
    }
  }
}
