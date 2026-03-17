import { Routes } from '@angular/router';
import {MainComponent} from './main/main';
import {SeriesComponent} from './series/series';
import {FavoritesComponent} from './favorites/favorites';

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'series', component: SeriesComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];
