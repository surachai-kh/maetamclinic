import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Ivaccine } from 'src/app/vaccine/interfaces/vaccine.interface';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private db: AngularFirestore,
    private fs: AngularFireStorage) { }

  //ชนิดของวัคซีน
  getVaccinetype() {
    return [
      'วัคซีนโรคหลัก',
      'วัคซีนโรคกลุ่มเสี่ยง'
    ];
  }

  //ส่วนของวัคซีน collection
  get getCollection() {
    return this.db.collection<Ivaccine>('vaccine');
  }

  // storage 
  get getStorage() { return this.fs.ref('vaccine'); }

  //บันทึกข้อมูล
  async saveCollection(data: any) {
    data.created = Date();
    data.updated = Date();
    const img = data.image as File;
    if (img) {
      const ref = this.getStorage.child(img.name) as AngularFireStorageReference
      const upload = await ref.put(img);
      data.image = upload.metadata.name;
    }
    return this.getCollection.add(data);
  }

  /** ลบข้อมูล doc ออกจาก collection */
  async deleteCollection(id: string): Promise<void> {
    const product = (await this.getCollection.doc(id).get().toPromise()).data();
    if (!product) return Promise.reject({ message: 'ไม่พบรูปภาพ' });
    await this.getCollection.doc(id).delete();
    if (product.image) await this.getStorage.child(product.image).delete().toPromise();
  }

  // แก้ไขข้อมูล
  async updateCollection(id: string, data: any) {
    const product = (await this.getCollection.doc(id).get().toPromise()).data();
    if (!product) return Promise.reject({ message: 'ไม่พบรูปภาพ' });
    const img = data.image as File;
    if (img) {
      const ref = this.getStorage.child(img.name) as AngularFireStorageReference;
      const upload = await ref.put(img);
      data.image = upload.metadata.name;
      if (product.image) this.getStorage.child(product.image).delete().subscribe();
    }
    else data.image = product.image;
    data.updated = new Date();
    return this.getCollection.doc(id).update(data);
  }
}
