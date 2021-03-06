import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { VaccineService } from '../vaccine/services/vaccine.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  //ชนิดของวัคซีน
  vaccinetype: string[]  = [];

  //ฟอร์มข้อมูล
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: VaccineService,
    private app: AppService,
    private rt: Router,
    private dom: DomSanitizer
  ) {
    this.createForm();
    this.vaccinetype = this.service.getVaccinetype();
  }

  ngOnInit(): void {
  }

  //บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return;
    this.app.loading(true);
    this.service
    .saveCollection(this.form.value)
    .then(() => {
      this.app.successAlert('เพิ่มสำเร็จ');
      this.rt.navigate(['/vaccine']);
    })
    .catch(error => this.app.errorAlert(error.message))
    .finally(() => this.app.loading(false));
  }

  /** แปลงข้อมูล File Input เป็น URL */
  get getFileUpload() {
    const imageForm = this.form.get('image');
    if (!imageForm) return;
    if (!imageForm.value) return;
    const file = imageForm.value as File;
    return this.dom.bypassSecurityTrustUrl(URL.createObjectURL(file));
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

  //สร้างฟอร์มช้อมูล
  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      serail: ['', Validators.required],
      exp: ['', Validators.required],
      image: ['']
    })
  }
}
