import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ivaccine } from 'src/app/vaccine/interfaces/vaccine.interface';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private db: AngularFirestore) { }

  //ชนิดของวัคซีน
  getVaccinetype() {
    return [
      'วัคซีนโรคหลัก',
      'วัคซีนโรกลุ่มเสี่ยง'
    ];
  }

  //ส่วนของวัคซีน collection
  get getCollection() {
    return this.db.collection<Ivaccine>('vaccine');
  }
//บันทึกข้อมูล
  saveCollection(data: any) {
    data.created = Date();
    data.updated = Date();
    return this.getCollection.add(data);
  }
// แก้ไขข้อมูล
  updateCollection(id: string, data: any) {
    data.updated = Date();
    return this.getCollection.doc(id).update(data);
  }

  

}
