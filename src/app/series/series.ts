import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../data/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './series.html',
  styleUrls: ['./series.css'],
})
export class SeriesComponent implements OnInit {

  series = signal<any[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  searchQuery = signal<string>('');
  isSearching = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries() {
    this.http.get<any>(
      `https://api.themoviedb.org/3/tv/popular?api_key=${Environment.tmdbApiKey}&language=ru-RU&page=${this.currentPage()}`
    ).subscribe((response: any) => {
      this.series.set(response.results);
      this.totalPages.set(response.total_pages);
    });
  }

  searchSeries() {
    const query = this.searchQuery().trim();
    if (!query) {
      this.isSearching.set(false);
      this.currentPage.set(1);
      this.loadSeries();
      return;
    }

    this.isSearching.set(true);
    this.http.get<any>(
      `https://api.themoviedb.org/3/search/tv?api_key=${Environment.tmdbApiKey}&language=ru-RU&query=${query}&page=${this.currentPage()}`
    ).subscribe((response: any) => {
      this.series.set(response.results);
      this.totalPages.set(response.total_pages);
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.isSearching() ? this.searchSeries() : this.loadSeries();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.isSearching() ? this.searchSeries() : this.loadSeries();
    }
  }

  addToFavorites(show: any) {
    this.favoritesService.add(show);
  }
}
