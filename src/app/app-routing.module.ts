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
  },

  {
    path: 'storage',
    loadChildren: () => import('./storage/storage.module')
      .then(m => m.StorageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module')
      .then(m => m.ProfileModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module')
      .then(m => m.AppointmentModule)
  },
  {
    path: 'vaccination',
    loadChildren: () => import('./vaccination/vaccination.module')
      .then(m => m.VaccinationModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module')
      .then(m => m.HistoryModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
