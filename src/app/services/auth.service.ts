import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { BehaviorSubject } from "rxjs/index";
import { of } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url: string = environment.auth_url;
  private _token: string;
  private userLogin: BehaviorSubject<string> = new BehaviorSubject<string>(`${ this.isAuth ? 'true' : '' }`);
  public loginEvent = this.userLogin.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  public get isAuth() {
    return this._token || localStorage.getItem('token');
  }

  private set token(token) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this.auth_url}/login`, { email, password }, { responseType: 'text' }).pipe (
      map((res: string): boolean => {
        this.token = res;
        return true;
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.auth_url}/signup`, {name, email, password}, {responseType: "text"}).pipe(
      map((res: string): boolean => {
        this.token = res;
        return true;
      })
    );
  }

  logout(): Observable <boolean> {
    this.token = '';
    localStorage.setItem('token','');
    this.emitLoginEvent('');
    return of(true);
  }
  public emitLoginEvent(data: string) {
    this.userLogin.next(data);
  }

}
