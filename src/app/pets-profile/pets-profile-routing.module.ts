import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, emailVerified } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { redirectEmailVerified } from '../guards/redirecte-email.guard';
import { PetsComponent } from './components/pets/pets.component';


const routes: Routes = [
  {
    path: '', component: PetsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login']) }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsProfileRoutingModule { }
