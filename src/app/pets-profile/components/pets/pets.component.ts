import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, FormGroupDirective, NgModel, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { Pets } from '../interfaces/pets.interface';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  petsRef: AngularFireList<Pets>;
  //ข้อมูลสัตว์เลี้ยง
  items: Pets[] = [];
  form!: FormGroup;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private app: AppService,
  ) {
    this.petsRef = this.db.list('/pets');
    this.loadData();
    this.createForm();


  }

  ngOnInit(): void {
  }

  // บันทึกข้อมูล
  onSubmit(f: FormGroupDirective) {
    if (this.form.invalid) return;
    const data = {
      ...this.form.value,
      created: new Date().getTime(),
      updated: new Date().getTime(),
    };
    this.petsRef.push(data)
      .then(() => {
        this.app.successAlert("เพิ่มสำเร็จ");
        this.form.reset();
        f.resetForm();
      })
      .catch(error => this.app.errorAlert(error.message));
  }

  // ลบข้อมูล
  onDelete(item: Pets) {
    Swal.fire({
      title: "คุณต้องการลบใช่ หรือ ไม่",
      text:'',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่"
    })
      .then((petsRef) => {
        if(!petsRef.value) return;
        this.app.loading(true);
        this.petsRef.remove(item.id)
        this.app.successAlert("ลบสำเร็จ");
      })
      .catch(error => this.app.errorAlert(error.message))
      .finally(() => this.app.loading(false));
  }

  //แสดงข้อมูลก่อนแก้ไข 
  onShowEdit(item: Pets) {
    this.items.forEach(m => m.active = false);
    item.active = true;
  }

  onEdit(item: Pets, model: NgModel) {
    if (model.invalid) return;
    this.app.loading(true);
    this.petsRef.update(item.id, {
      name: model.value,
      updated: new Date().getTime()
    })
      .then(() => this.app.successAlert("แก้ไขสำเร็จ"))
      .catch(error => this.app.errorAlert(error.message))
      .finally(() => this.app.loading(false));
  }

  private loadData() {
    this.petsRef.snapshotChanges().subscribe(res => {
      this.items = res.map(item => {
        return { id: item.key, ...item.payload.val() as Pets };
      });
    });
  }

  //สร้างฟอร์มข้อมูล
  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      species: ['']
    });
  }

}
