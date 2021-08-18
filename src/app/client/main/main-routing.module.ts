import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
          canLoad: [RoleGuard],
      },
      {
        path: 'movies',
        loadChildren: () =>
          import('./movies/movies.module').then((m) => m.MoviesPageModule),
          canLoad: [RoleGuard],

      },
      {
        path: 'screenings',
        loadChildren: () =>
          import('./screenings/screenings.module').then(
            (m) => m.ScreeningsPageModule
          ),
          canLoad: [RoleGuard],

      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./reservations/reservations.module').then(
            (m) => m.ReservationsPageModule
          ),
        canLoad: [RoleGuard],
      },
    ],
  },
  {
    path: 'screenings/:id',
    loadChildren: () =>
      import('./screenings/screening-detail/screening-detail.module').then(
        (m) => m.ScreeningDetailPageModule
      ),
    canLoad: [RoleGuard],
  },
  {
    path: 'ticket',
    loadChildren: () =>
      import('./ticket/ticket.module').then((m) => m.TicketPageModule),
      canLoad: [RoleGuard],
  },
  {
    path: 'screenings-search',
    loadChildren: () =>
      import('./screenings-search/screenings-search.module').then(
        (m) => m.ScreeningsSearchPageModule
      ),
      canLoad: [RoleGuard],

  },
  {
    path: 'movies-search',
    loadChildren: () =>
      import('./movies-search/movies-search.module').then(
        (m) => m.MoviesSearchPageModule
      ),
      canLoad: [RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
