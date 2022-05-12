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
    this.game.active_level.players[0].upgrade_unit(this.template,this.upgrade);
    e.preventDefault();
    e.stopPropagation();
  }

}
