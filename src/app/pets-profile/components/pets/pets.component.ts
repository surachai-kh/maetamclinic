import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, FormGroupDirective, NgModel, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
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
        this.app.dialog('เพิ่มสำเร็จ');
        this.form.reset();
        f.resetForm();
      })
      .catch(error => this.app.dialog(error.message));
  }

  // ลบข้อมูล
  async onDelete(item: Pets) {
    const confirm = await this.app.confirm('คุณต้องการลบใช่ หรือ ไม่');
    if (!confirm) return;
    this.app.loading(true);
    this.petsRef.remove(item.id)
      .then(() => this.app.dialog('ลบสำเร็จ'))
      .catch(error => this.app.dialog(error.message))
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
      .then(() => this.app.dialog('แก้ไขสำเร็จ'))
      .catch(error => this.app.dialog(error.message))
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
