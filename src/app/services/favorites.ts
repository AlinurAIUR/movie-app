import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = signal<any[]>([]);

  add(movie: any) {
    this.favorites.update(f => [...f, movie]);
  }

  remove(movie: any) {
    this.favorites.update(f => f.filter(m => m.id !== movie.id));
  }
}
