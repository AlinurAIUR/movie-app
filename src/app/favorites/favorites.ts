import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesService} from '../services/favorites.service';
import {Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent {

  constructor(
    public favoritesService: FavoritesService,
    private router: Router
  ) {}

  openMovie(movie: any) {
    const type = movie.media_type || (movie.name ? 'tv' : 'movie');
    this.router.navigate(['/movie', movie.id, type]);
  }

  remove(movie: any, event: Event) {
    event.stopPropagation(); // теперь реально работает
    this.favoritesService.remove(movie);
  }
}
