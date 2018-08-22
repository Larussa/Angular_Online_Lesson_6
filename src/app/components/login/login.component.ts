import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isAuth) this.router.navigate(['/']);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: boolean) => {
      if (res) this.router.navigate(['/']);
      this.auth.emitLoginEvent('true');
    }, error => {
      console.log(error.massage);
    });
  }
  onBlur(name: string) {
    if (this.loginForm.get(name).invalid) {
      console.log('input', name, 'invalid');
    }
  }
}
