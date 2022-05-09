import * as PIXI from "pixi.js";
import { Level } from "./Level";
import { ResourceLoader } from "./ResourceLoader";
import { Vector2 } from "./TypeDefinitions";

ResourceLoader.add_texture('assets/images/Chess_blt45.svg');

/**
 * An extendable object, that is directly linked to a pixi sprite.
 */
export class Spriteful
{
  level : Level;
  sprite:PIXI.Sprite;
  _position:Vector2;
  size:Vector2 = [1,1]; // If animated, used to determine the frames

  constructor(level:Level, position:Vector2, sprite:{url:string,size?:Vector2})
  {
    this.level = level;
    this._position = position;
    this.size = sprite.size;
    this._create_sprite(sprite.url,sprite.size);
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


  current_animation ?: {name:string, frame:number, frame_size:Vector2, length:number, duration:number, start_time:number}

  set_animation_frame(index:number)
  {
    this.sprite.texture.frame.x = this.current_animation.frame_size[0] * (index % this.current_animation.length);
    this.sprite.texture.updateUvs();
  }

  set_texture(texture:PIXI.Texture)
  {
    let {sprite,size} = this;
    sprite.texture = texture;
    if(size)
    {
      sprite.texture.frame.width = size[0];
      sprite.texture.updateUvs();
      // sprite.texture.tile
    }
  }

  _create_sprite(url:string = 'assets/images/Chess_blt45.svg', size?:Vector2) : PIXI.Sprite
  {
    // console.error("HOW?")
    const position = this._position;

    const sprite = this.sprite = new PIXI.Sprite;
    // let spritesheet = new PIXI.Spritesheet(PIXI.Texture.from(url),{frames:[{frame:}]})
    ResourceLoader.load_texture(url).then((texture)=>{

    });


    console.log(sprite.texture.width,sprite.texture.frame)
    // sprite.texture.updateUvs();
    // let rect = sprite.texture.frame.clone();
    // rect.x = 1;
    // sprite.texture.frame = rect;
    // sprite.texture.updateUvs();

    // center the sprite's anchor point
    sprite.anchor.set(0.5,1);

    // // set the sprite to the center of the screen
    sprite.x = position[0];
    sprite.y = position[1];

    this.level.container.addChild(sprite);

    return sprite;
  }

  destroy()
  {
    this.sprite.destroy();
  }
}
