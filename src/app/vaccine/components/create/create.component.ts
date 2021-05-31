import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  //ชนิดของวัคซีน
  typevaccine = [
    'วัคซีนโรคหลัก',
    'วัคซีนโรกลุ่มเสี่ยง'
  ];

  //ฟอร์มข้อมูล
  form!: FormGroup;

  constructor(private fb: FormBuilder
    ) {
      this.createForm();
     }

  ngOnInit(): void {
  }

  //บันทึกข้อมูล
  onSubmit() {
    if(this.form.invalid) return;
    console.log(this.form.value);
  }

  //สร้างฟอร์มช้อมูล
  private createForm() {
    this.form = this.fb.group({
      name: ['',Validators.required],
      type: ['',Validators.required],
      serail: ['',Validators.required],
      exp: ['',Validators.required]
    })
  }
}
