import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/game/Game';
import { UnitInstance, UnitTemplate } from 'src/game/Unit';

@Component({
  selector: 'app-spawnmenu-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class SpawnmenuItemComponent implements OnInit {
  @Input()
  template:UnitTemplate;
  @Input()
  game:Game;

  constructor() { }

  ngOnInit(): void {
  }

  click()
  {
    new UnitInstance(0,this.game.active_level,this.template,[...this.game.active_level.bases[0]._position]);
  }

}
