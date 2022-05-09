import { Game } from "./Game";
import { Level } from "./Level";
import { UnitInstance, UNITS, UnitTemplate } from "./Unit";
import units from "./units";

/**
 * A Player contains all data related to an active Player, like spawned monsters, resources, etc
 */
export class Player
{
  money : number = 0;
  income : number = 0; // money per second
  deck:UnitTemplate[] = [...Object.values(units)];
  last_spawn_time : Record<string,number> = {}
  index: number;
  level: Level;

  constructor(index:number,level:Level)
  {
    this.level = level;
    this.index = index;
  }

  spawn_unit(template:UnitTemplate)
  {
    new UnitInstance(0,this.level,template,[...this.level.bases[0]._position]);
    this.level.players[0].last_spawn_time[template.label] = Date.now();
    this.money -= template.cost;
  }

  /**
   * Called every frame
   * @param delta Time since last update in ms
   */
  update(delta:number)
  {
    delta /= 1000; // to seconds
    this.money += this.income * delta;
  }
}
