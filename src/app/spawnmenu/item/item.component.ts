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

  window = window;

  constructor() { }

  ngOnInit(): void {
  }

  click()
  {
    this.game.active_level.players[0].spawn_unit(this.template);
  }

}
