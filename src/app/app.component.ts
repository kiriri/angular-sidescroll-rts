import { Component, Input } from '@angular/core';
import { Game } from 'src/game/Game';

let game = new Game();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sidescroll-rts';
  game = game;
}
