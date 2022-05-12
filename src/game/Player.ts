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
  deck:UnitTemplate[] = Object.values(units).map(v=>{return {...v}}); // all units this player can spawn
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
    new UnitInstance(this.index,this.level,template,[this.level.bases[this.index]._position[0], this.level.bases[this.index]._position[1] - Math.random() * 25]);
    this.last_spawn_time[template.label] = this.level.time;
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

  is_player() : boolean
  {
    return this.index == 0;
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
    if(!(template.label in this.upgrades))
      this.upgrades[template.label] = [];
    this.upgrades[template.label].push(upgrade);

    let additions = upgrade.add ?? {};
    for(let k in additions)
    {
      template[k] += additions[k];
    }

    let mults = upgrade.multiply ?? {};
    for(let k in mults)
    {
      template[k] *= mults[k];
    }
  }

  get_unit_progress(template:UnitTemplate) : number
  {
    let difficulty = this.is_player() ? 1 : this.level.template.difficulty;
    return Math.min(1, difficulty * (this.level.time - this.get_last_spawn_time(template)) / template.spawn_cooldown);
  }

  can_spawn(template:UnitTemplate):boolean
  {
    let result = (this.level.players[0].money >= template.cost) && (this.get_unit_progress(template) >= 1);
    return result;
  }

  /**
   * Called every frame
   * @param delta Time since last update in ms
   */
  update(delta:number)
  {
    delta /= 1000; // to seconds
    this.money += this.income * delta;

    // If this player is an AI
    if(!this.is_player())
    {
      if(this.can_spawn(this.get_deck()[0]))
      {
        console.log("SPAWN")
        this.spawn_unit(this.get_deck()[0]);
      }
    }
  }
}
