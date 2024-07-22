import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Observable } from 'rxjs';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Book {
  title: string;
  author: string;
  cover: string | null;
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
  comments?: Comment[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class HomeComponent implements OnInit {
  mediaItems: MediaItem[] = [];
  activeTab: 'movies' | 'shows' | 'books' = 'movies';
  IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  selectedItem: MediaItem | null = null;
  newComment: string = '';

  comment = new FormGroup({
    comment: new FormControl(''),
  });

  user: any = null;

  books: Book[] = [];

  userEmail: string | null = null;

  showLoginModal: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.fetchMedia(this.activeTab);
    this.getCurrentUser();
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = this.document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getCurrentUser() {
    const userEmail = this.getCookie('userEmail');
    if (userEmail) {
      this.userEmail = userEmail;
    } else {
      console.error('User email not found in cookies');
    }
  }

  setActiveTab(tab: 'movies' | 'shows' | 'books') {
    this.activeTab = tab;
    this.fetchMedia(tab);
  }

  fetchComments(itemId: number) {
    this.http
      .get<Comment[]>(
        `https://seans-review-app.netlify.app/comments/${itemId}/`
      )
      .subscribe(
        (response: Comment[]) => {
          // console.log('Fetched comments successful', response);
          if (this.selectedItem) {
            this.selectedItem.comments = response;
          }
        },
        (error) => {
          console.error('Error fetching comments', error);
          if (this.selectedItem) {
            this.selectedItem.comments = [];
          }
        }
      );
  }

  postComment(postId: number, content: string) {
    if (!this.userEmail) {
      console.error('User email not available');
      return;
    }

    this.http
      .post<Comment>(
        `https://seans-review-app.netlify.app/comments/${postId}/`,
        {
          content,
          author: this.userEmail,
        }
      )
      .subscribe(
        (response: Comment) => {
          // console.log('Posted comment successfully', response);
          if (this.selectedItem) {
            this.selectedItem.comments?.push(response);
          }
        },
        (error) => {
          console.error('Post comment failed', error);
        }
      );
  }

  submitComment() {
    if (this.selectedItem && this.newComment.trim() && this.userEmail) {
      this.postComment(this.selectedItem.id, this.newComment.trim());
      this.newComment = '';
    } else if (!this.userEmail) {
      this.showLoginModal = true;
    }
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  openItem(item: MediaItem) {
    this.selectedItem = item;
    // console.log(this.selectedItem);
    if (item.id) {
      this.fetchComments(item.id);
    }
  }

  closeItem() {
    this.selectedItem = null;
  }

  addToFavorites(item: MediaItem) {
    if (!this.userEmail) {
      console.error('User email not available');
      this.showLoginModal = true;
      return;
    }

    const favorite = {
      category: this.activeTab,
      itemId: item.id,
    };

    this.http
      .post(`https://seans-review-app.netlify.app/users/favourites/`, {
        email: this.userEmail,
        favorites: [favorite],
      })
      .subscribe(
        (response) => {
          console.log('Added to favorites successfully', response);
        },
        (error) => {
          console.error('Error adding to favorites', error);
        }
      );
  }

  fetchMedia(mediaType: string) {
    let url = '';
    switch (mediaType) {
      case 'movies':
        url =
          'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0577d8564c0417a0ea3f55c39a476c00&page=1';
        break;
      case 'shows':
        url =
          'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=0577d8564c0417a0ea3f55c39a476c00&page=1';
        break;
      case 'books':
        url = 'https://openlibrary.org/subjects/random.json?limit=50';
        break;
    }

    this.http.get<any>(url).subscribe(
      (response: any) => {
        // console.log(`Fetch ${mediaType} successful`, response);
        if (mediaType === 'books') {
          this.mediaItems = response.works.map((item: any, index: number) => ({
            id: index,
            title: item.title,
            cover_image: item.cover_id
              ? `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg`
              : null,
          }));
        } else {
          this.mediaItems = response.results.map((item: any) => ({
            ...item,
            rating: item.vote_average,
          }));
        }
      },
      (error) => {
        console.error(`Error fetching ${mediaType}:`, error);
      }
    );
  }
}
