import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    private db: AngularFirestore,
    private service: AuthService
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
    .catch(error => this.app.errorAlert('error.message'))
    .finally(() => this.app.loading(false))
  }

  //load data login user
  private loadUserLogin() {
    this.auth.user.subscribe(user => {
     if(user) this.userLogin = user;
    });
  }

  getUsers() {
    this.service.getCollection.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  });
  }
}
