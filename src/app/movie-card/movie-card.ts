import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../data/environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})
export class MovieCardComponent implements OnInit {

  movie = signal<any | null>(null);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}
  goBack() {
    this.location.back();
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const type = params.get('type') || 'movie'; // 👈 теперь поддержка tv

      console.log('ID:', id);
      console.log('TYPE:', type);

      if (id) {
        this.http.get<any>(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${Environment.tmdbApiKey}&language=ru-RU`
        ).subscribe(data => {
          console.log('DATA:', data);
          this.movie.set(data);
        });
      }
    });
  }
}
