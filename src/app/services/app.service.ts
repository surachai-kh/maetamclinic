import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '../shareds/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //สำหรับดักจับเปิด ปิด loading
  private loadingSubject: Subject<boolean>;

  constructor(
    private snackbar: MatSnackBar,
    private matDialog: MatDialog
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
  //Dialog ยืนยันรายการ
  confirm(message: string) {
    return this.matDialog.open(ConfirmComponent, {
      width: '280px',
      data: message,
      disableClose: true
    }).afterClosed().toPromise<boolean>();
  }
}
