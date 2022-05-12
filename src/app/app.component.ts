import { Component, Injectable, Input } from '@angular/core';
import { Game } from 'src/game/Game';
import { Level } from 'src/game/Level';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sidescroll-rts';
  game : Game = window["game"];

  reset_level()
  {
    this.game.new_level();
  }

}
