import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {


  displayedColumns = [
    'id',
    'name',
    'type',
    'serail',
    'exp'
  ];


  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {

  }
}
