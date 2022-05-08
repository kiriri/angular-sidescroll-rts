import * as PIXI from "pixi.js";
import { Level } from "./Level";
import { Vector2 } from "./TypeDefinitions";

/**
 * An extendable object, that is directly linked to a pixi sprite.
 */
export class Spriteful
{
  level : Level;
  sprite:PIXI.Sprite;
  _position:Vector2;

  constructor(level:Level, position:Vector2, url?:string)
  {
    this.level = level;
    this._position = position;
    this._create_sprite(url);
  }

  set_position(x:number,y?:number)
  {
    this._position[0] = x;
    this.sprite.position.x = x;
    if(y !== undefined)
    {
      this._position[1] = y;
      this.sprite.position.y = y;
    }
  }

  _create_sprite(url:string = 'assets/images/Chess_blt45.svg')
  {
    const position = this._position;
    const sprite = this.sprite = PIXI.Sprite.from(url);

    // center the sprite's anchor point
    sprite.anchor.set(0.5);

    // // set the sprite to the center of the screen
    sprite.x = position[0];
    sprite.y = position[1];

    this.level.container.addChild(sprite);
  }

  destroy()
  {
    this.sprite.destroy();
  }
}