import { Component, OnInit } from '@angular/core';
import * as PIXI from "pixi.js";


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

    const bunny = PIXI.Sprite.from('assets/images/Chess_blt45.svg');

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = this.app.screen.width / 2;
    bunny.y = this.app.screen.height / 2;

    this.app.stage.addChild(bunny);

    // Listen for animate update
    this.app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        bunny.position.x += .3 * delta;
    });
  }

}
