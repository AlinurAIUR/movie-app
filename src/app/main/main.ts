import {Component, OnInit, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../data/environments/environment';
import {CommonModule} from '@angular/common';
import {FavoritesService} from '../services/favorites.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class MainComponent implements OnInit {

  movies = signal<any[]>([]);

  constructor(
    private http: HttpClient,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.http.get<any>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Environment.tmdbApiKey}&language=ru-RU&page=1`
    ).subscribe((response: any) => {
      this.movies.set(response.results);
    });
  }

  addToFavorites(movie: any) {
    this.favoritesService.add(movie);
  }
}
