import { Component } from '@angular/core';
import {Header} from './header/header';
import { MainComponent} from './main/main';
import {FavoritesComponent} from './favorites/favorites';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, RouterOutlet, FooterComponent],
  styleUrls: ['./app.css'],
})
export class AppComponent {}

