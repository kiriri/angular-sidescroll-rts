import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/game/Game';

import { Peasant } from 'src/game/units/peasant';

@Component({
  selector: 'app-spawnmenu',
  templateUrl: './spawnmenu.component.html',
  styleUrls: ['./spawnmenu.component.scss']
})
export class SpawnmenuComponent implements OnInit
{

  @Input()
  game:Game;


  constructor() { }

  ngOnInit(): void {
  }

}
