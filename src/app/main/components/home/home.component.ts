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
   }

  ngOnDestroy(){
   }

  ngOnInit(): void {
  }

}
