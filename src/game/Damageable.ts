export interface Damageable
{
  health:number;
  take_damage(v:number):void;
  die():void;
}
