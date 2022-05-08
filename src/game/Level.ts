import { Game } from "./Game";
import { UnitInstance } from "./Unit";
import * as PIXI from "pixi.js"
import { Player } from "./Player";
import { Viewport } from "pixi-viewport";
import { Peasant } from "./units/peasant";
import { Base } from "./Base";

export interface LevelTemplate
{
  width: number;
}

/**
 * A level contains all data related to an active level, like spawned monsters, resources, etc
 */
export class Level
{
  players: [Player, Player] = [new Player(), new Player()];
  units: Set<UnitInstance>[] = [new Set(), new Set()];
  game: Game;

  container: PIXI.Container;

  constructor(game: Game, template: LevelTemplate)
  {
    this.game = game;
    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: template.width,
      worldHeight:1,


      interaction: game.app.renderer.plugins["interaction"] // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    // add the viewport to the stage
    game.app.stage.addChild(viewport)

    // activate plugins
    viewport
      .drag({ direction: "x" })
      .pinch()
      .wheel()
      .decelerate()
      .clamp({ direction: "x", underflow:"center" })
      .clampZoom({ maxWidth:  Math.max(template.width + 200, window.innerWidth), minWidth: Math.min(template.width,500) })

    this.container = viewport;





    let base_0 = new Base(this,[100,this.game.app.screen.height / 2]);
    let base_1 = new Base(this,[template.width-100,this.game.app.screen.height / 2]);

    let peasant = new UnitInstance(0,this,Peasant,[base_0.sprite.position.x,this.game.app.screen.height / 2]);
    let peasant2 = new UnitInstance(1,this,Peasant,[base_1.sprite.position.x,this.game.app.screen.height / 2]);




  }

  add_unit(unit:UnitInstance)
  {
    let {player} = unit;
    let unit_list = this.units[player];
    unit_list.add(unit);
  }

  remove_unit(unit:UnitInstance)
  {
    let {player} = unit;
    let unit_list = this.units[player];
    unit_list.delete(unit);
  }

  /**
   *
   * @param delta time since last update in seconds
   */
  update(delta: number)
  {
    this.units[0].forEach(v =>
    {
      v.update(delta);
    });
    this.units[1].forEach(v =>
    {
      v.update(delta);
    })

    for(let i = 0; i < 2; i++)
    {
      let units = this.units[i];
      units.forEach(v=>{
        if(v.dead)
          v.destroy();
      })
    }
  }

  destroy()
  {
    this.container.destroy();
  }
}
