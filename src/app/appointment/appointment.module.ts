import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shareds/material-module';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
@NgModule({
  declarations: [
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    jqxSchedulerModule
  ],
  providers: [],
  bootstrap: [AppointmentComponent],
  exports: [jqxSchedulerModule]
})
export class AppointmentModule { }
