import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private app: AppService,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

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
}