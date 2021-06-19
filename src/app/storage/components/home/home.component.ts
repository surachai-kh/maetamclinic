import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'
import { AppService } from 'src/app/services/app.service';
import firebase from 'firebase';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //ชื่อไฟล์
  fileItems: File[] = [];

  //สร้าง imageref
  imageRef: AngularFireStorageReference;

  listImageItems: Array<firebase.storage.Reference & { url?: string; }> = [];

  constructor(
    private storage: AngularFireStorage,
    private app: AppService
  ) {
    this.imageRef = this.storage.ref('test');
    this.loadimageUploaded();
  }

  ngOnInit(): void {
  }

  //ลบรูป
  onDeleteFile(item: firebase.storage.Reference, index: number) {
    Swal.fire({
      title: 'คุณต้องการลบ ใช่ หรือ ไม่',
      text: '',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่"
    }).then(result => {
      if (result.value) {
        this.app.loading(true);
        item.delete()
        this.app.successAlert('ลบสำเร็จแล้ว');
        this.listImageItems.splice(index, 1);
        
      }
    })
      .catch(error => this.app.errorAlert(error.message))
      .finally(() => this.app.loading(false));
  }

  //อัฟโหลดไฟล์
  onuploadFile(): any {
    if (this.fileItems.length <= 0) return this.app.warnAlert('กรุณาเลือกรูปภาพที่จะอัปโหลด');
    const fileUpload = this.fileItems.map(file => {
      const ref = this.imageRef.child(file.name) as AngularFireStorageReference
      return ref.put(file);
    });
    this.app.loading(true);
    Promise.all(fileUpload)
      .then(results => {
        this.fileItems.splice(0);
        this.app.successAlert("อัปโหลดรูปภาพสำเร็จ");
        results.forEach(async result => {
          const img = result.ref;
          if (this.listImageItems.find(m => m.name == img.name)) return;
          const url = await img.getDownloadURL();
          (img as any).url = url;
          this.listImageItems.push(img);
        });
      })
      .catch(error => this.app.errorAlert(error.message))
      .finally(() => this.app.loading(false))
  }

  //เมื่อเลือกไฟล์ที่ต้องการอัปโหลด
  onchangeFile(inputFile: HTMLInputElement) {
    const { files } = inputFile;
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files.item(index);
        if (!file) continue;
        this.fileItems.push(file);
      }
      inputFile.value = '';
    }
  }

  onRemoveFile(index: number) {
    this.fileItems.splice(index, 1);
  }

  //ดึงข้อมูลรูปภาพที่อัปโหลดแล้ว

  private loadimageUploaded() {
    this.imageRef.listAll().subscribe(list => {
      this.fileItems = [];
      list.items.forEach(async img => {
        const url = await img.getDownloadURL();
        (img as any).url = url;
        this.listImageItems.push(img);
      });
    });
  }
}
