import { Component, OnInit } from '@angular/core';
import * as PIXI from "pixi.js";
import { Game } from 'src/game/Game';
import { Level } from 'src/game/Level';
import { UnitInstance } from 'src/game/Unit';
import { Peasant } from 'src/game/units/peasant';


@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent implements OnInit
{

  private app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
  });

  game:Game;

  clicked = false;

  constructor() { }

  clickme = () =>
  {
    console.log("CLICKED")
    this.clicked = true;
  }

  ngOnInit(): void
  {
    document.body.appendChild(this.app.view);

    let game = this.game = new Game(this.app);

    // let level = new Level(game,{width:2000});



    // Listen for animate update
    this.app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        game.active_level.update(delta);
    });
  }

}
