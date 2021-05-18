import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private app: AppService,
  ) { }

  ngOnInit(): void {
  }
 
}