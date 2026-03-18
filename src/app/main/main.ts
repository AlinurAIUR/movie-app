import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../data/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';   // 🔹 добавлено для routerLink
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // 🔹 MovieCardComponent убран, RouterModule добавлен
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class MainComponent implements OnInit {

  movies = signal<any[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  searchQuery = signal<string>('');
  isSearching = signal<boolean>(false);

  genres = [
    { id: 28, name: 'Боевик' },
    { id: 35, name: 'Комедия' },
    { id: 18, name: 'Драма' },
    { id: 27, name: 'Ужасы' },
    { id: 10749, name: 'Мелодрама' },
    { id: 878, name: 'Фантастика' }
  ];

  selectedGenre: number | null = null;

  constructor(
      private http: HttpClient,
      public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get<any>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Environment.tmdbApiKey}&language=ru-RU&page=${this.currentPage()}`
    ).subscribe((response: any) => {
      this.movies.set(response.results);
      this.totalPages.set(response.total_pages);
    });
  }

  searchMovies() {
    const query = this.searchQuery().trim();
    if (!query) {
      this.isSearching.set(false);
      this.currentPage.set(1);
      this.loadMovies();
      return;
    }

    this.isSearching.set(true);
    this.http.get<any>(
        `https://api.themoviedb.org/3/search/movie?api_key=${Environment.tmdbApiKey}&language=ru-RU&query=${query}&page=${this.currentPage()}`
    ).subscribe((response: any) => {
      this.movies.set(response.results);
      this.totalPages.set(response.total_pages);
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.isSearching() ? this.searchMovies() : this.loadMovies();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.isSearching() ? this.searchMovies() : this.loadMovies();
    }
  }

  filterByGenre(genreId: number | null) {
    this.selectedGenre = genreId;
  }

  filteredMovies() {
    if (!this.selectedGenre) {
      return this.movies();
    }
    return this.movies().filter(movie => movie.genre_ids.includes(this.selectedGenre));
  }
  addToFavorites(show: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.add(show);
  }
}
