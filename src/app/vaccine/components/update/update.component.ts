import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private service: VaccineService,
    private app: AppService,
    private rt: Router,
    private act: ActivatedRoute
  ) {
    this.vaccineId = this.act.snapshot.params.id;
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
      .updateCollection(this.vaccineId,this.form.value)
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
        exp: [data.exp, Validators.required]
      });
    }
    catch (error) {
      this.rt.navigate(['/vaccine']);
    }
    finally {
      this.app.loading(false)
    }
  }
}
