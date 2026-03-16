import { Routes } from '@angular/router';
import {MainComponent} from './main/main';
import {FavoritesComponent} from './favorites/favorites';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'favorites', component: FavoritesComponent }
];
