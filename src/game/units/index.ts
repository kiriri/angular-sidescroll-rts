
import { Horse } from "./horse";
import { Peasant } from "./peasant";
import { Snail } from "./snail";

const units = [
  Peasant,
  Horse,
  Snail
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
