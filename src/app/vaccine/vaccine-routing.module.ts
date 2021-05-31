import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { redirectEmailVerified } from '../guards/redirecte-email.guard';
import { CreateComponent } from './components/create/create.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';

const routes: Routes = [
  {
    path: '', component: VaccineComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login']) }
  },
  {
    path: 'create', component: CreateComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login']) }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule { }
