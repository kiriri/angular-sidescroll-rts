import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/game/Game';
import { UnitTemplate, UnitUpgrade } from 'src/game/Unit';

@Component({
  selector: 'app-spawnmenu-item-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  @Input()
  template:UnitTemplate;
  @Input()
  upgrade:UnitUpgrade;
  @Input()
  game:Game;

  constructor() { }

  ngOnInit(): void {
  }

  click(e:MouseEvent)
  {
    if(this.get_progress() >= 1)
      this.game.active_level.players[0].upgrade_unit(this.template,this.upgrade);
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Return [0,1] progress towards meeting the (xp) requirements
   */
  get_progress():number
  {
    return this.game.active_level.players[0].get_unit_xp(this.template) / this.upgrade.xp;
  }

  get_scale()
  {
    return `translateX(-${50 - this.get_progress() * 50}%) scaleX(${this.get_progress()})`;
  }

}
