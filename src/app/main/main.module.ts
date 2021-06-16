import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../shareds/material-module';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ChartsModule,
  ]
})
export class MainModule { }
