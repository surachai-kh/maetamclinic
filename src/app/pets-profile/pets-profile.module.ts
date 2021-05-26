import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsProfileRoutingModule } from './pets-profile-routing.module';
import { PetsComponent } from './components/pets/pets.component';
import { MaterialModule } from '../shareds/material-module';


@NgModule({
  declarations: [
    PetsComponent
  ],
  imports: [
    CommonModule,
    PetsProfileRoutingModule,
    MaterialModule
  ]
})
export class PetsProfileModule { }
