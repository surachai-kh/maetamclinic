import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ConfirmComponent } from '../shareds/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //สำหรับดักจับเปิด ปิด loading
  private loadingSubject: Subject<boolean>;

  constructor(
    private snackbar: MatSnackBar,
    private matDialog: MatDialog,
    private storage: AngularFireStorage
  ) {
    this.loadingSubject = new Subject<boolean>();
  }

  //ดึงข้อมูล Subject
  get getLoading() { return this.loadingSubject; }

  //ใช้งาน loading
  loading(status: boolean) {
    this.loadingSubject.next(status);
  }
  // Dialog แจ้งเตือน 
  dialog(message: string) {
    return this.snackbar.open(message, 'ปิดหน้านี้', {
      duration: 3000
    });
  }
  // Dialog ยืนยันรายการ
  confirm(message: string) {
    return this.matDialog.open(ConfirmComponent, {
      width: '280px',
      data: message,
      disableClose: true
    }).afterClosed().toPromise<boolean>();
  }
  successAlert (message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }
  errorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  warnAlert(message: string) {
    Swal.fire({
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
