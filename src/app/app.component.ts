import { Component, Injectable, Input } from '@angular/core';
import { Game } from 'src/game/Game';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sidescroll-rts';
  game : Game = window["game"];

}
