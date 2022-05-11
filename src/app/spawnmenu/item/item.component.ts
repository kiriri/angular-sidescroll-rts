import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/game/Game';
import { UnitInstance, UnitTemplate } from 'src/game/Unit';



@Component({
  selector: 'app-spawnmenu-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class SpawnmenuItemComponent {
  @Input()
  template:UnitTemplate;
  @Input()
  game:Game;

  window = window;

  constructor() { }

  click()
  {
    requestAnimationFrame(()=>{
      this.game.active_level.players[0].spawn_unit(this.template);
    })
  }

  time:number = 0;
  ngAfterContentChecked()
  {
    this.time = Date.now();
    // console.log()
  }

  can_spawn():boolean
  {
    let result = (this.game.active_level.players[0].money >= this.template.cost) && (this._get_progress() >= 1);
    return result;
  }

  _get_progress():number
  {

    let result = Math.min(1, (this.time - this.game.active_level.players[0].get_last_spawn_time(this.template)) / this.template.spawn_cooldown);

    return result;
  }

  get_progress():string
  {
    let progress = this._get_progress()
    return `translateY( ${ 50 - progress * 50}% ) scaleY(${progress * 100}%) `;
  }

}
