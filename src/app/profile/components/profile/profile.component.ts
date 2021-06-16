import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userLogin!: firebase.User;

  constructor(
    private app: AppService,
    private auth: AngularFireAuth,
    private router: Router
  ) { 
    this.loadUserLogin();
  }

  ngOnInit(): void {
  }
  //ยืนยันอีเมล์
  onVerifyEmail() {
    this.app.loading(true);
    this.userLogin.sendEmailVerification()
    .then(() => this.app.successAlert('ส่งการยืนยันไปที่อีเมล์แล้ว'))
    .catch(error => this.app.errorAlert(error.message))
    .finally(() => this.app.loading(false))
  }

  //load data login user
  private loadUserLogin() {
    this.auth.user.subscribe(user => {
     if(user) this.userLogin = user;
    });
  }
}
