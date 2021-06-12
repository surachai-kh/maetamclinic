import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { redirectEmailVerified } from '../guards/redirecte-email.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
    {
      path: '', component: HomeComponent,
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login']) }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
