import { Component } from '@angular/core';
import {Header} from './header/header';
import { MainComponent} from './main/main';
import {FavoritesComponent} from './favorites/favorites';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, MainComponent, FavoritesComponent],
  styleUrls: ['./app.css'],
})
export class AppComponent {}
