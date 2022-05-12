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



  get_progress():string
  {
    let progress = this.game.active_level.players[0].get_unit_progress(this.template);
    return `translateY( ${ 50 - progress * 50}% ) scaleY(${progress * 100}%) `;
  }

}
