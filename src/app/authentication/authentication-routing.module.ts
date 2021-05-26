import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: () => redirectLoggedInTo('/')}
  },
  { path: 'register', component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: () => redirectLoggedInTo('/')}
  },
  { path: 'forgot-password', component: ForgotPasswordComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: () => redirectLoggedInTo('/')} 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
