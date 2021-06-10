import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  //ข้อมูลผู้ใช้ที่ login
  userLogin!: firebase.User;

  constructor(
    private app: AppService,
    private auth: AngularFireAuth,
    private router: Router
    ) {
    this.loadUserLogin();
   }

  ngOnDestroy(){
   }

  ngOnInit(): void {
  }

  //ออกจากระบบ
  onLogout(){
    this.app.loading(true);
    this.auth.signOut()
    .then(() => {
      this.app.successAlert('ออกจากระบบแล้ว')
      this.router.navigate(['/authentication/login'])
    })
    .catch(error => this.app.errorAlert(error.message))
    .finally(() => this.app.loading(false))
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
