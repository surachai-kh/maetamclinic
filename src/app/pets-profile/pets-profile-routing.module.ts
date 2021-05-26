import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, emailVerified } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { PetsComponent } from './components/pets/pets.component';

//ตรวจสอบการยืนยัน อีเมล์
const redirectEmailVerified = (redirectURL: [any]) => {
  return pipe(emailVerified, map(status => status || redirectURL))
};

const routes: Routes = [
  { 
    path:'', component:PetsComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login'])}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsProfileRoutingModule { }
