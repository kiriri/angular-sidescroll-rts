import { Peasant } from "./peasant";

const units = [
  Peasant
];

export default units;

for(let i = 0; i < units.length; i++)
{
  let unit = units[i];
  for(let k in unit.animations)
  {
    // PIXI.Loader.shared.add("images/spritesheet.json")
  }
}
