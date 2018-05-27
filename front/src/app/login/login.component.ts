import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'faycal.jebali1@gmail.com';
  password = '123';
  token: any;
  constructor(private router: Router, private auhenticationService: AuthenticationService) { }

  ngOnInit() { }

  loginUser() {
    this.auhenticationService.login(this.username, this.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['home']);
        }
      });
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
    this.auhenticationService.login2().subscribe(
        (data) => { 
            this.token = data;
            localStorage.setItem('token', this.token);
            console.log('success Login : ', data);
         },
        (error) => { console.log('Error Login : ', error);},
        () => {}
    );
}
}

