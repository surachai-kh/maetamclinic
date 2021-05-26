import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {

    this.db.database.ref('/').on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

}
