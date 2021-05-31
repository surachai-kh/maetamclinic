import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { MaterialModule } from '../shareds/material-module';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VaccineComponent,
    CreateComponent
    
  ],
  imports: [
    CommonModule,
    VaccineRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VaccineModule { }
