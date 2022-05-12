import { Game } from "./Game";
import { Level } from "./Level";
import { UnitInstance, UNITS, UnitTemplate, UnitUpgrade } from "./Unit";
import units from "./units";

/**
 * A Player contains all data related to an active Player in a Level, like spawned monsters, resources, etc
 */
export class Player
{
  money : number = 100; // currently held money
  income : number = 0; // money per second
  deck:UnitTemplate[] = [...Object.values(units)]; // all units this player can spawn
  last_spawn_time : Record<string,number> = {}; // unit-name -> last timestamp a unit was spawned
  upgrades : Record<string,UnitUpgrade[]> = {}; // unit-name -> upgrade selection
  index: 0|1; // Index in level players array
  level: Level;

  constructor(index:0|1,level:Level)
  {
    this.level = level;
    this.index = index;
  }

  /**
   * Spawn a unit with all side effects that entails.
   * This does not verify whether the spawn action is legal.
   * @param template
   */
  spawn_unit(template:UnitTemplate)
  {
    new UnitInstance(0,this.level,template,[this.level.bases[0]._position[0], this.level.bases[0]._position[1] - Math.random() * 25]);
    this.level.players[0].last_spawn_time[template.label] = Date.now();
    this.money -= template.cost;
  }

  /**
   * Get the timestamp the unit template was last spawned at.
   * @param template
   * @returns
   */
  get_last_spawn_time(template:UnitTemplate) : number
  {
    return this.last_spawn_time[template.label] ?? 0;
  }

  /**
   * Get an array of all unit templates this player can spawn.
   * @returns
   */
  get_deck():UnitTemplate[]
  {
    return this.deck;
  }

  get_upgrades(template:UnitTemplate) : UnitUpgrade[]
  {
    return this.upgrades[template.label] ?? [];
  }

  upgrade_unit(template:UnitTemplate, upgrade:UnitUpgrade)
  {
    this.upgrades[template.label].push(upgrade);
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
