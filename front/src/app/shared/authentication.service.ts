import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Constant } from '../shared/constant';

@Injectable()
export class AuthenticationService {

  public token: string;

  constructor(private http: Http) { }
  header = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDciLCJ1c2VyIjoiRmF5Y2FsIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTI3MjA0MjMwfQ.ryIAEILd4CkkH0T4iUaDqj53kvMhibItkeEfuW6kQ80'
  });
  options = new RequestOptions({
      headers: this.header, withCredentials: false
  });


  header2 = new Headers({
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDciLCJ1c2VyIjoiRmF5Y2FsIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTI3MjA0MjMwfQ.ryIAEILd4CkkH0T4iUaDqj53kvMhibItkeEfuW6kQ80'
  });
options2 = new RequestOptions({
    headers: this.header2, withCredentials: false
});

  login(username: string, password: string): Observable<boolean> {

    var headers = new Headers();
    // headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append("Content-type", "application/x-www-form-urlencoded");

    return this.http.post(
      Constant.ApiRoot + Constant.TokenService2,
      { email: username, password: password },
      { headers: headers })
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        console.log(response);
        if (token) {
          this.token = token;
          return true;
        }
        else {
          return false;
        }
      });
  }

  login2(): Observable<any> {
    const _url = 'http://localhost:3007/users/login';
    return this.http.post(_url,
      {
        email: 'faycal.jebali1@gmail.com', password: '123' 
      }, this.options2);
  }
  logout(): void {
    this.token = null;
  }

  getUserLoggedIn() {
    if (this.token)
      return true;

    return false;
  }
}
