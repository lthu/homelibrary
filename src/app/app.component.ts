import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'my-selector',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ds: DataService) {}

  ngOnInit() {
    
  }
  funk(res) {

  }
}
