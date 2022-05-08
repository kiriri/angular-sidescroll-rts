import { Game } from "./Game";
import { UnitInstance } from "./Unit";
import * as PIXI from "pixi.js"
import { Player } from "./Player";
import { Viewport } from "pixi-viewport";

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
      worldHeight: 1000,

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
      .clamp({ direction: "x", })
      .clampZoom({ maxWidth:  template.width, minWidth: 500 })
    this.container = viewport;
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
  }

  destroy()
  {
    this.container.destroy();
  }
}
