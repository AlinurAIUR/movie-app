import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = signal<any[]>([]);

  constructor() {
    const data = localStorage.getItem('favorites');
    if (data) {
      this.favorites.set(JSON.parse(data));
    }
  }

  add(movie: any) {
    this.favorites.update(f => {
      // Проверяем, есть ли фильм уже в списке
      const exists = f.some(m => m.id === movie.id);
      if (exists) {
        return f; // если есть — возвращаем без изменений
      }

      const updated = [...f, movie];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  }


  remove(movie: any) {
    this.favorites.update(f => {
      const updated = f.filter(m => m.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });

  }
}

