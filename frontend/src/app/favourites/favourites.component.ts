import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  _id: string;
  favorites: any[];
  email: string;
  isAdmin: boolean;
  password: string;
  __v: number;
}

interface MediaItem {
  id: number;
  title: string;
  poster_path?: string;
  cover_image?: string;
  vote_average?: number;
  rating?: number;
  overview?: string;
  description?: string;
}

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  user: User | null = null;
  favoriteItems: MediaItem[] = [];
  IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userEmail = this.getCookie('userEmail');
    if (userEmail) {
      this.getUserDetails(userEmail);
    }
  }

  private getUserDetails(email: string) {
    this.http.get<User>(`http://localhost:8000/users/${email}`).subscribe(
      (userData) => {
        this.user = userData;
        console.log('User details:', this.user);
        this.getFavoriteItems();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  private getFavoriteItems() {
    if (this.user && this.user.favorites) {
      this.user.favorites.forEach((favorite) => {
        this.getItemDetails(favorite.category, favorite.itemId);
      });
    }
  }

  private getItemDetails(category: string, itemId: number) {
    let url = '';
    switch (category) {
      case 'movies':
        url = `https://api.themoviedb.org/3/movie/${itemId}?api_key=0577d8564c0417a0ea3f55c39a476c00`;
        break;
      case 'shows':
        url = `https://api.themoviedb.org/3/tv/${itemId}?api_key=0577d8564c0417a0ea3f55c39a476c00`;
        break;
      case 'books':
        url = `https://openlibrary.org/works/${itemId}.json`;
        break;
    }

    this.http.get<any>(url).subscribe(
      (response) => {
        const item: MediaItem = {
          id: response.id,
          title: response.title || response.name,
          poster_path: response.poster_path,
          cover_image:
            category === 'books'
              ? `https://covers.openlibrary.org/b/id/${response.covers[0]}-L.jpg`
              : undefined,
          vote_average: response.vote_average,
          overview: response.overview,
          description: response.description,
        };
        this.favoriteItems.push(item);
      },
      (error) => {
        console.error(`Error fetching ${category} details:`, error);
      }
    );
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
