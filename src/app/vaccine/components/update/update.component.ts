import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { AppService } from 'src/app/services/app.service';
import { VaccineService } from '../vaccine/services/vaccine.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  //ชนิดของวัคซีน
  vaccinetype: string[] = [];

  //ฟอร์มข้อมูล
  form!: FormGroup;

  //แก้ไขข้อมูล
  vaccineId: string;

  //เก็บชื่อแสดงหัวข้อฟอร์ม
  vaccineName!: string;

  //รูปวัคซีน
  vaccineImage!: string;

  constructor(
    private fb: FormBuilder,
    private service: VaccineService,
    private app: AppService,
    private rt: Router,
    private act: ActivatedRoute,
    private dom: DomSanitizer
  ) {
    this.vaccineId = this.act.snapshot.params.id;
    this.createForm();
    this.vaccinetype = this.service.getVaccinetype();
  }

  ngOnInit(): void {
  }

  /** แปลงข้อมูล File Input เป็น URL */
  get getFileUpload() {
    const imageForm = this.form.get('image');
    if (imageForm && imageForm.value) {
      const file = imageForm.value as File;
      return this.dom.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
    else if (this.vaccineImage) return this.vaccineImage;
    else return;
  }

  /** เมื่อเลือกไฟล์อัพโหลด */
  onChangeFile(input: HTMLInputElement) {
    const imageForm = this.form.get('image');
    if (!imageForm) return;
    const { files } = input;
    if (files && files.length > 0) {
      const file = files[0];
      imageForm.setValue(file);
    }
  }

  //บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return;
    this.app.loading(true);
    this.service
      .updateCollection(this.vaccineId, this.form.value)
      .then(() => {
        this.app.successAlert('แก้ไข้ข้อมูลสำเร็จ');
        this.rt.navigate(['/vaccine']);
      })
      .catch(error => this.app.errorAlert(error.message))
      .finally(() => this.app.loading(false));
  }

  //สร้างฟอร์มช้อมูล
  private async createForm() {
    this.app.loading(true);
    try {
      const doc = await this.service.getCollection.doc(this.vaccineId).get().toPromise();
      const data = doc.data();
      if (!doc.exists || !data) this.app.errorAlert("ไม่พบข้อมูลดังกล่าว");
      this.vaccineName = data.name;
      this.form = this.fb.group({
        name: [data.name, Validators.required],
        type: [data.type, Validators.required],
        serail: [data.serail, Validators.required],
        exp: [data.exp, Validators.required],
        image: ['']
      });
      if (!data.image) return;
      const ref = this.service.getStorage.child(data.image) as AngularFireStorageReference;
      this.vaccineImage = await ref.getDownloadURL().toPromise();
    }
    catch (error) {
      this.app.errorAlert(error.message);
      this.rt.navigate(['/vaccine']);
    }
    finally {
      this.app.loading(false)
    }
  }
}
