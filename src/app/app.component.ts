import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private app: AppService,
   ) {
   

  }

  

  //ดึงข้อมูล loading page
  get loading() {return this.app.getLoading; }
}
