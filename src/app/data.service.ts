import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http/';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  success(response) {
    console.log("OK")
  }
  error(err: HttpErrorResponse) {
    console.log(err.error.message);
  }
  fetchOne(id: number, callback: (jsonObject) => void) {
    this.http.get('https://bookapi666.herokuapp.com/book/' + id).subscribe(jsonObject => {
      callback(jsonObject);
    }, jsonObject => {
      console.log(jsonObject.error);
      callback(jsonObject.error);
    });
  }
  fetchAll(callback) {
    this.http.get('https://bookapi666.herokuapp.com/books/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addBook(callback, body) {
    this.http.post('https://bookapi666.herokuapp.com/add/book', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  deleteBook(callback, body) {
    this.http.post('https://bookapi666.herokuapp.com/delete/book', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addAuthor(callback, body) {
    this.http.post('https://bookapi666.herokuapp.com/add/author', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  getAuthors(callback) {
    this.http.get('https://bookapi666.herokuapp.com/authors/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  getAuthor(callback, id: number) {
    this.http.get('https://bookapi666.herokuapp.com/author/' + id).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  updateAuthorName(body, callback) {
    this.http.post('https://bookapi666.herokuapp.com/update/author/', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  getShelves(callback) {
    this.http.get('https://bookapi666.herokuapp.com/shelves/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addShelf(callback, body) {
    this.http.post('https://bookapi666.herokuapp.com/add/shelf', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addGenre(callback, body) {
    this.http.post('https://bookapi666.herokuapp.com/add/genre', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  deleteGenre(callback, body) {
    this.http.post('https://bookapi666.herokuapp.com/delete/genre', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  getGenres(callback) {
    this.http.get('https://bookapi666.herokuapp.com/genres/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
}
