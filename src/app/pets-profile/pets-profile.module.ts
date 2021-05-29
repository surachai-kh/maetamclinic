import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsProfileRoutingModule } from './pets-profile-routing.module';
import { PetsComponent } from './components/pets/pets.component';
import { MaterialModule } from '../shareds/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PetsComponent
  ],
  imports: [
    CommonModule,
    PetsProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PetsProfileModule { }
