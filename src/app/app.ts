import { Component } from '@angular/core';
import {Header} from './header/header';
import { MainComponent} from './main/main';
import {FavoritesComponent} from './favorites/favorites';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, RouterOutlet],
  styleUrls: ['./app.css'],
})
export class AppComponent {}

