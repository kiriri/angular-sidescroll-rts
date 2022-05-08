import * as PIXI from "pixi.js";
import { Level } from "./Level";

/**
 * The Game (pseudo-)singleton contains all game related data. It is the highest level data container.
 */
export class Game
{
  app ?: PIXI.Application;

  active_level : Level;

  constructor(app : PIXI.Application)
  {
    this.set_pixi(app);
    this.active_level = new Level(this,{width:2000});
  }

  set_pixi(app : PIXI.Application)
  {
    this.app = app;
  }
}
