import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //ฟอร์มข้อมูล
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private app: AppService,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.createFormData();
  }
  ngOnInit(): void {
  }

<<<<<<< HEAD
  // login Email
  ongoogleLogin() {
=======
  // login with Gmail
  onLogin() {
>>>>>>> f36abb0fbcfcc7430880214a718f12b633f7c30e
    var provider = new firebase.auth.GoogleAuthProvider();
    this.app.loading(true);
    this.auth
      .signInWithPopup(provider)
      .then((user) => this.router.navigate(['/']))
      .catch((error) => this.app.dialog(error.message))
      .finally(() => this.app.loading(false));
  }
<<<<<<< HEAD
  //facebooklogin
  onfacebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider ();
    this.app.loading(true);
    this.auth
      .signInWithPopup(provider)
      .then((user) => this.router.navigate(['/']))
      .catch((error) => this.app.dialog(error.message))
      .finally(() => this.app.loading(false));
  }
  /** บันทึกข้อมูล (สมัครสมาชิก) */
=======
  
  /** เข้าสู่ระบบ */
>>>>>>> f36abb0fbcfcc7430880214a718f12b633f7c30e
  onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.app.loading(true);
    this.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.router.navigate(['/']))
      .catch((error) => this.app.dialog(error.message))
      .finally(() => this.app.loading(false));
  }

  /** สร้างฟอร์มข้อมูล */
  private createFormData() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
