import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http/';

@Injectable()
export class DataService {
  //private url = 'http://192.168.1.52:5000';
  private url = 'https://bookapi666.herokuapp.com';
  constructor(private http: HttpClient) { }

  /*Get one book for view page*/
  fetchOne(id: number, callback: (jsonObject, result: boolean) => void) {
    this.http.get(this.url + '/book/' + id).subscribe(jsonObject => {
      callback(jsonObject, true);
    }, jsonObject => {
      callback(jsonObject.error, false);
    });
  }
  /*Get one book for editing page*/
  fetchOneEdit(id: number, callback: (jsonObject, result: boolean) => void) {
    this.http.get(this.url + '/book/edit/' + id).subscribe(jsonObject => {
      callback(jsonObject, true);
    }, jsonObject => {
      console.log(jsonObject.error);
      callback(jsonObject.error, false);
    });
  }
  /*Get all books for list page*/
  fetchAll(callback) {
    this.http.get(this.url + '/books').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addBook(callback, body) {
    this.http.post(this.url + '/add/book', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  updateBook(callback, body) {
    this.http.post(this.url + '/update/book', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  deleteBook(callback, body) {
    this.http.post(this.url + '/delete/book', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addAuthor(callback, body) {
    this.http.post(this.url + '/add/author', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Get all authors for list authors page*/
  getAuthors(callback) {
    this.http.get(this.url + '/authors/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Get one author's name for editing*/
  getAuthor(callback: (jsonObject, success: boolean) => void, id: number) {
    this.http.get(this.url + '/author/' + id).subscribe(jsonObject => {
      callback(jsonObject, true);
    }, jsonObject => {
      callback(jsonObject.error, false);
    });
  }
  updateAuthorName(body, callback) {
    this.http.post(this.url + '/update/author/', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Get all shelves. Not used at the moment*/
  getShelves(callback) {
    this.http.get(this.url + '/shelves/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  getShelf(callback, id) {
    this.http.get(this.url + '/shelves/' + id).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  addShelf(callback, body) {
    this.http.post(this.url + '/add/shelf', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  updateShelfName(callback, body) {
    this.http.post(this.url + '/update/shelf', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Add new genre to be used in books*/
  addGenre(callback, body) {
    this.http.post(this.url + '/add/genre', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  deleteGenre(callback, body) {
    this.http.post(this.url + '/delete/genre', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Get all genres for editing and adding a book*/
  getGenres(callback) {
    this.http.get(this.url + '/genres/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Get all genres for a single book*/
  getCurrentBookGenres(callback, id: number) {
    this.http.get(this.url + '/book/genres/' + id).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Get all pictures for a single book*/
  getCurrentBookPictures(callback, id: number) {
    this.http.get(this.url + '/book/pictures/' + id).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Add a picture to a book*/
  addBookPicture(callback, body) {
    this.http.post(this.url + '/book/add/picture', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Remove a single picture from a book*/
  removeBookPicture(callback, body) {
    this.http.post(this.url + '/book/remove/picture', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Remove a single picture from a book*/
  removeBookGenre(callback, body) {
    this.http.post(this.url + '/book/remove/genre', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Add a genre to a single book*/
  addBookGenre(callback, body) {
    this.http.post(this.url + '/book/add/genre', body).subscribe(jsonObject => {
      callback(jsonObject);
    });
  }

  getCategories(callback) {
    this.http.get(this.url + '/categories/').subscribe(jsonObject => {
      callback(jsonObject);
    });
  }
  /*Upload a picture from user to server*/
  uploadPicture(body, callback: (jsonObject, result: boolean) => void) {
    this.http.post('http://lauri.kk4.fi/homeLibrary/upload.php', body, { observe: 'response' }).subscribe(jsonObject => {
      console.log(jsonObject);
      callback(jsonObject.body, true);

    }, jsonObject => {
      console.log(jsonObject);
      callback(jsonObject.error, false);
    });
  }
}