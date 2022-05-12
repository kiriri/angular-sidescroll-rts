import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/game/Game';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  @Input()
  game:Game;

  math=Math;

  constructor() { }

  ngOnInit(): void {
  }

}
