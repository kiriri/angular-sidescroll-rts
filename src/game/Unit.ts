/**
 * A unit
 */

export interface UnitDescriptor
{
  cost: number;
  income: number; // awarded permanently
  income_alive: number; // awarded per second while alive
  loot: number; // rewarded to opponent on destruction
  spawn_cooldown: number; // in ms
  range: number;
  health: number;
  damage: number;
  attack_cooldown: number; // in ms
  damage_trigger_delay: number; // how many ms to wait after attack animation has started, before damage is applied?
  splash: number; // if 0, don't splash at all
}

export interface UnitTemplate extends UnitDescriptor
{
  upgrades: [
    UnitUpgrade[],
    UnitUpgrade[],
    UnitUpgrade[]
  ]
}

export interface UnitUpgrade
{
  label: string;
  description: string;
  add?:Partial<UnitDescriptor>;
  multiply?:Partial<UnitDescriptor>;
}
