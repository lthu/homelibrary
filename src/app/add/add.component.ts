import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private name;
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

  private authors = [];
  private shelves = [];
  private statuses = [];
  private genres = [];

  constructor(private cs: CookieService, private ds: DataService) { }

  ngOnInit() {
    this.ds.getAuthors(this.setAuthors.bind(this));
    this.ds.getShelves(this.setShelves.bind(this));
    this.ds.getGenres(this.setGenres.bind(this));
    this.setAineistolaji();
  }
  submit() {
    const authorInputValue = (<HTMLInputElement>document.getElementById("authors")).value;
    const authorDatalistId = document.querySelector("#authorsDatalist option[value='"+authorInputValue+"']").id;

    const shelfInputValue = (<HTMLInputElement>document.getElementById("shelves")).value;
    const shelfDatalistId = document.querySelector("#shelfDatalist option[value='"+shelfInputValue+"']").id;


    const body = {name: this.name, alaji: this.aineistolaji, isbn: this.isbn,
               authorId: authorDatalistId, description: this.description,
               year: this.year, info: this.info, genre: this.genre, shelfId: shelfDatalistId, status: this.statusId};


    this.cs.set("alaji", this.aineistolaji);
    this.ds.addBook(this.bookCallBack.bind(this), body);

  }
  clear() {
    this.name = '';
    this.isbn = '';
    this.authorId = null;
    this.description = '';
    this.year = '';
    this.info = '';
    this.genre = '';
    this.shelfId = '';
    this.statusId = null;
  }
  bookCallBack(res) {
    this.msg = res;
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
