import { Component, OnInit, Input } from '@angular/core';
import { Box, Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game: Game;
  constructor() { }

  ngOnInit(): void {
  }

  click(box: Box){
    if(!this.game.lost)
      box.touch(this.game);
  }

  rightClick(box: Box){
    if(!this.game.lost)
      box.setFlag();
    return false;
  }

}
