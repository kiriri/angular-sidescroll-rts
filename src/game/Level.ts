import { Game } from "./Game";
import { UnitInstance } from "./Unit";
import * as PIXI from "pixi.js"
import { Player } from "./Player";
import { Viewport } from "pixi-viewport";
import { Peasant } from "./units/peasant";
import { Base } from "./Base";
import { Building } from "./Building";

export interface LevelTemplate
{
  width: number;
  difficulty:number; // normalized value, 1 plays as good as possible
}

/**
 * A level contains all data related to an active level, like spawned monsters, resources, etc
 */
export class Level
{
  players: [Player, Player] = [new Player(0,this), new Player(1,this)];
  bases : [Base,Base];
  game: Game;

  container: PIXI.Container;
  viewport: Viewport;

  template : LevelTemplate;

  winner : number = -1;

  time : number = Date.now();

  difficulty

  constructor(game: Game, template: LevelTemplate)
  {
    this.game = game;
    this.template = template;

    this.container = new PIXI.Container();


    if(game.app)
    {
      this.initialize_viewport();
    }

    let height = 0;

    let base_0 = new Base(0,this,[100,height]);
    let base_1 = new Base(1,this,[template.width-100,height]);

    this.bases = [base_0,base_1];

    // let peasant = new UnitInstance(0,this,Peasant,[base_0.sprite.position.x,height]);
    // let peasant2 = new UnitInstance(1,this,Peasant,[base_1.sprite.position.x,height]);
  }

  initialize_viewport()
  {
    console.log("INIT")
    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: this.template.width,
      worldHeight:1,


      interaction: this.game.app.renderer.plugins["interaction"] // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    // activate plugins
    viewport
      .drag({ direction: "x" })
      .pinch()
      .wheel()
      .decelerate()
      .clamp({ direction: "x", underflow:"center" })
      .clampZoom({ maxWidth:  Math.max(this.template.width + 200, window.innerWidth), minWidth: Math.min(this.template.width,500) })

    viewport.addChild(this.container);
    this.container.position.y = window.innerHeight/2;

    this.viewport = viewport;

    // add the viewport to the stage
    this.game.app.stage.addChild(viewport);

  }

  add_unit(unit:UnitInstance)
  {
    let {player} = unit;
    let unit_list = this.players[player].units;
    unit_list.push(unit);
  }

  remove_unit(unit:UnitInstance)
  {

  }

  /**
   *
   * @param delta time since last update in seconds
   */
  update(delta: number)
  {
    if(this.winner >= 0)
      return;

    this.time += delta * 1000;

    for(let i = 0; i < 2; i++)
    {
      this.players[i].update(delta);
    }

    // Remove all destroyed units
    for(let i = 0; i < 2; i++)
    {
      let units = this.players[i].units;
      let destroyed_unit_count = 0;
      for(let i = 0; i < (units.length - destroyed_unit_count); i++)
      {
        let unit = units[i];
        if(unit.destroyed)
        {
          // Swap with last for easy removal
          units[i] = units[units.length - destroyed_unit_count - 1];
          units[units.length - destroyed_unit_count - 1] = unit;
          destroyed_unit_count++;
          i--;
        }
      }

      for(let i = 0; i < destroyed_unit_count; i++)
      {
        units.pop();
      }
    }

    // Sort by x position
    for(let i = 0; i < 2; i++)
    {
      this.players[i].units.sort((a,b)=>i === 0 ? a._position[0] - b._position[0] : b._position[0] - a._position[0])
    }

    // Do attacks and other actions
    for(let i = 0; i < 2; i++)
    {
      this.players[i].units.forEach(v =>
        {
          v.update(delta);
        }
      );
    };

    // Do movement actions
    for(let i = 0; i < 2; i++)
    {
      this.players[i].units.forEach(v =>
        {
          v.update_position(delta);
        }
      );
    }

    // Destroy dead units
    for(let i = 0; i < 2; i++)
    {
      let units = this.players[i].units;
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
