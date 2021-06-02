import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { MaterialModule } from '../shareds/material-module';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './components/update/update.component';


@NgModule({
  declarations: [
    VaccineComponent,
    CreateComponent,
    UpdateComponent
    
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
