import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  private genreLength: number;
  private genreCheck: boolean;
  private formCheck: boolean;

  private msg: string;
  private isbn: string;
  private name: string;
  private categoryId: number;
  private alaji: number;
  private id: number;
  private author: string;
  private year: number;
  private description: string;
  private info: string;
  private res;
  private shelfId: number;
  private statusId: number;
  private genre: string;

  private newPicture;
  private sub: any;
  private file;

  private authors = [];
  private categories = [];
  private shelves = [];
  private statuses = [];
  private genres = [];
  private bookGenres = [];
  private pictures = [];

  constructor(private router: Router, private route: ActivatedRoute, private ds: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"];
    });

    this.ds.fetchOneEdit(this.id, this.fetchCallback.bind(this));
    this.ds.getCategories(this.setCategories.bind(this));
    this.ds.getAuthors(this.setAuthors.bind(this));
    this.ds.getShelves(this.setShelves.bind(this));
    this.ds.getGenres(this.setGenres.bind(this));


  }
  fetchCallback(res, success) {
    if (success) {
      this.res = res[0];
      this.name = this.res.name;
      this.categoryId = this.res.categoryId;
      this.alaji = this.res.alajiId;
      this.year = this.res.year;
      this.author = this.res.author;
      this.isbn = this.res.isbn;
      this.description = this.res.description;
      this.info = this.res.info;
      this.shelfId = this.res.shelfId;
      this.statusId = this.res.statusId;

      this.ds.getCurrentBookGenres(this.setCurrentBookGenres.bind(this), this.id);
      this.ds.getCurrentBookPictures(this.setCurrentBookPictures.bind(this), this.id);
      this.formCheck = true;
    } else {
      this.msg = res.message + ' ' + res.description;
    }
  }

  submit() {

    if (this.authors.findIndex(x => x.name === this.author) >= 0) {
      const authorInputValue = (<HTMLInputElement> document.getElementById("authors")).value;
      const authorDatalistId = document.querySelector("#authorsDatalist option[value='"+authorInputValue+"']").id;

      const body = { id: this.id, category: this.categoryId, name: this.name, alaji: this.alaji, isbn: this.isbn,
                    author: authorDatalistId, description: this.description, year: this.year, info: this.info,
                    shelfId: this.shelfId, status: this.statusId };

      this.ds.updateBook(this.updateCallback.bind(this), body);

      if (this.genre) {
        const genreBody = { id: this.id, genres: this.genre };
        this.ds.addBookGenre(this.addBookGenreCallback.bind(this), genreBody);
      }
    } else {
      this.msg = 'Invalid author';
    }
  }
  addPicture() {
    const body = {id: this.id, file: this.newPicture };
    this.ds.addBookPicture(this.pictureCallback.bind(this), body);
  }
  setAuthors(res) {
    this.authors = res;
  }
  setCategories(res) {
    this.categories = res;
  }
  setShelves(res) {
    this.shelves = res;
  }
  setGenres(res) {
    this.genres = res;
    this.genreLength = this.genres.length;
  }
  setCurrentBookGenres(res) {
    this.bookGenres = res;
    if (this.bookGenres.length > 0) {
      this.genreCheck = true;
    } else {
      this.genreCheck = false;
    }

  }
  setCurrentBookPictures(response) {
    this.pictures = response;
  }
  updateCallback(res) {
    this.msg = res;
  }
  delPicture(pictureId) {
    const body = {id: pictureId};
    console.log(body);
    this.ds.removeBookPicture(this.pictureCallback.bind(this), body);
  }
  pictureCallback(res) {
    this.msg = res;
    this.ds.getCurrentBookPictures(this.setCurrentBookPictures.bind(this), this.id);
  }
  delGenre(genreId) {
    console.log(genreId);
    const body = {id: genreId};
    this.ds.removeBookGenre(this.removeGenreCallback.bind(this), body);
  }
  removeGenreCallback(res) {
    this.msg = res;
    this.ds.getCurrentBookGenres(this.setCurrentBookGenres.bind(this), this.id);
  }
  addBookGenreCallback(res) {
    this.msg = res;
    setTimeout(() => {
      this.ds.getCurrentBookGenres(this.setCurrentBookGenres.bind(this), this.id);
    }, 3000);
  }
  fileUp() {
    const fd = new FormData();
    const files = (<HTMLInputElement>document.getElementById('file')).files[0];
    fd.append('upload', 't');
    fd.append('file', files);
    this.ds.uploadPicture(fd, this.fileUploadCallback.bind(this));
  }
  fileUploadCallback(res, result: boolean) {
    this.msg =  res.message;
    if (result) {
      const body = {id: this.id, file: res.file };
      this.ds.addBookPicture(this.pictureCallback.bind(this), body);
    }
  }
  deleteBook() {
    const body = {id: this.id};
    this.ds.deleteBook(this.callbackDelete.bind(this), body);
    this.router.navigate(['/homeLibrary/']);
  }
  callbackDelete(res) {
    this.msg = res;
  }
  onDestroy() {
    this.sub.unsubscribe();
  }
}
