import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { redirectEmailVerified } from '../guards/redirecte-email.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login']) }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
