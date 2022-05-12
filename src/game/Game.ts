import * as PIXI from "pixi.js";
import { Level } from "./Level";
import Units from "./units";

console.log("Loaded units ", Units);

/**
 * The Game (pseudo-)singleton contains all game related data. It is the highest level data container.
 */
export class Game
{
  app ?: PIXI.Application;

  active_level : Level;

  constructor()
  {
    // this.set_pixi(app);
    this.new_level();

  }

  new_level()
  {
    let old_level = this.active_level;
    this.active_level = new Level(this,{width:2000});
    if(old_level)
    {
      old_level.destroy();
    }
  }

  set_pixi(app : PIXI.Application)
  {
    this.app = app;

    if(this.active_level)
    {
      // add the viewport to the stage
      this.active_level.initialize_viewport();
      // this.active_level.container.
    }
  }
}
