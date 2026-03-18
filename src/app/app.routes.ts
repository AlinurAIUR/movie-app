import { Routes } from '@angular/router';
import {MainComponent} from './main/main';
import {SeriesComponent} from './series/series';
import {FavoritesComponent} from './favorites/favorites';
import { MovieCardComponent } from './movie-card/movie-card';

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'movie/:id/:type', component: MovieCardComponent },
  { path: 'series', component: SeriesComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },

];
