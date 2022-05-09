import { Component, Input, OnInit } from '@angular/core';
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
  @Input()
  game:Game;

  private app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2980b9
  });

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

    this.game.set_pixi(this.app);


    let last_update = Date.now();
    // Listen for animate update
    this.app.ticker.add((delta) => {

      delta = (Date.now()-last_update)/1000;
      last_update = Date.now();
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        this.game.active_level.update(delta);
    });
  }

}
