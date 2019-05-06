import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  private isbn;
  private name;
  private aineistolaji;
  private id;
  private authorId;
  private year;
  private description;
  private info;
  private res;
  private shelfId;
  private statusId;
  private sub: any;


  private authors = [];
  private shelves = [];
  private statuses = [];
  private genres = [];
  constructor(private route: ActivatedRoute, private ds: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"];
    });

    this.ds.fetchOne(this.id, this.funk.bind(this));
    this.ds.getAuthors(this.setAuthors.bind(this));
    this.ds.getShelves(this.setShelves.bind(this));
    this.ds.getGenres(this.setGenres.bind(this));
  }
  funk(res) {
    this.res = res[0];
    this.name = this.res.nimi;
    this.aineistolaji = this.res.aineistolajiId;
    this.year = this.res.vuosi;
    this.authorId = this.res.tekija;
    this.isbn = this.res.isbn;
    this.description = this.res.kuvaus;
    this.info = this.res.lisatiedot;
    this.shelfId = this.res.hylly;
    this.statusId = this.res.tila_id;
    console.log(res[0]);
  }
/*
 teos_id              | int(11)      | NO   | PRI | NULL    | auto_increment |
| teos_nimi            | varchar(250) | NO   |     | NULL    |                |
| teos_aineistolaji_id | int(11)      | YES  |     | NULL    |                |
| teos_isbn            | varchar(25)  | YES  |     | NULL    |                |
| teos_tekija_id       | int(11)      | YES  | MUL | NULL    |                |
| teos_kuvaus          | varchar(250) | YES  |     | NULL    |                |
| teos_vuosi           | int(11)      | YES  |     | NULL    |                |
| teos_lisatiedot      | varchar(25)  | YES  |     | NULL    |                |
| teos_hylly_id        | int(11)      | YES  | MUL | NULL    |                |
| teos_tila_id
*/
  submit() {
    const authorInputValue = (<HTMLInputElement>document.getElementById("authors")).value;
    const authorDatalistId = document.querySelector("#authorsDatalist option[value='"+authorInputValue+"']").id;

    const shelfInputValue = (<HTMLInputElement>document.getElementById("shelves")).value;
    const shelfDatalistId = document.querySelector("#shelfDatalist option[value='"+shelfInputValue+"']").id;

    const body = { name: this.name, alaji: this.aineistolaji, isbn: this.isbn, tekija: authorDatalistId, description: this.description,
                   year: this.year, info: this.info, shelfId: shelfDatalistId, status: this.statusId };

    console.log(body);
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
  onDestroy() {
    this.sub.unsubscribe();
  }
}
