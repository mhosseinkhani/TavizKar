import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  actualVersion: string;
clientQty=1250;
  constructor() {
  }

  ngOnInit() {
    this.actualVersion ='اتومکانیک اکبر'; //environment.version;
  }
}
