import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesService} from '../services/favorites';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent {

  constructor(public favoritesService: FavoritesService) {}

}
