import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { redirectEmailVerified } from '../guards/redirecte-email.guard';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {
    path: '', component: HistoryComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectEmailVerified(['/authentication/login']) }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
