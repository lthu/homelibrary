import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private book = {name: '', categoryId: '', aineistolaji: '', isbn: '', authorId: '', description: '', year: '', info: '', genre: '', shelfId: '', statusId: ''};
  private name;
  private categoryId;
  private aineistolaji;
  private isbn;
  private authorId: number;
  private description;
  private year;
  private info;
  private shelfId;
  private statusId = 1;
  private datavalue;
  private genre;
  private msg;

  private categories = [];
  private authors = [];
  private shelves = [];
  private statuses = [];
  private genres = [];

  constructor(private cs: CookieService, private ds: DataService) { }

  ngOnInit() {
    this.ds.getCategories(this.setCategories.bind(this));
    this.ds.getAuthors(this.setAuthors.bind(this));
    this.ds.getShelves(this.setShelves.bind(this));
    this.ds.getGenres(this.setGenres.bind(this));
    this.setAineistolaji();

  }
  submit() {

    if (this.authors.findIndex(x => x.name === this.book.authorId) >= 0) {

    const authorInputValue = (<HTMLInputElement>document.getElementById("authors")).value;
    const authorDatalistId = document.querySelector("#authorsDatalist option[value='"+authorInputValue+"']").id;




    const body = {name: this.book.name, categoryId: this.book.categoryId, alaji: this.book.aineistolaji, isbn: this.book.isbn,
               authorId: authorDatalistId, description: this.book.description,
               year: this.book.year, info: this.book.info, genre: this.book.genre, shelfId: this.book.shelfId, status: this.book.statusId};

    console.log(body);

    this.cs.set("alaji", this.aineistolaji);
    this.ds.addBook(this.bookCallBack.bind(this), body);
    } else {
      this.msg = "Väärä tekijä";
      this.authorId = null;
    }

  }
  clear() {
    this.book.name = '';
    this.book.isbn = '';
    this.book.authorId = null;
    this.book.description = '';
    this.book.year = '';
    this.book.info = '';
    this.book.genre = '';
    this.book.shelfId = '';
    this.statusId = null;
  }
  bookCallBack(res) {
    this.msg = res;
  }
  setCategories(res) {
    this.categories = res;
  }
  setAuthors(res) {
    this.authors = res;
  }
  setShelves(res) {
    this.shelves = res;
  }
  setGenres(res) {
    this.genres = res;
  }
  setAineistolaji() {
    this.aineistolaji = this.cs.get("alaji");
  }
}
