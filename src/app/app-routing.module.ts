import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  {
    path: 'pets-profile',
    loadChildren: () => import('./pets-profile/pets-profile.module')
      .then(m => m.PetsProfileModule)
  },

  {
    path: 'vaccine',
    loadChildren: () => import('./vaccine/vaccine.module')
      .then(m => m.VaccineModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
