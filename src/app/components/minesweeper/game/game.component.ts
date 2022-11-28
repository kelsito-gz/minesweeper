import { Component, OnInit, Input } from '@angular/core';
import { Box, Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game: Game;
  missingBombs: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.missingBombs = this.game.bombs;
    this.setDataWidth();
  }

  private setDataWidth(){
    var style: any = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML  = `.data-width { width: ${this.game.boxs.length * 1.5}vw}`;
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementsByClassName('data-width')[0].className = 'data data-width';
  }

  click(box: Box){
    if(!this.game.lost)
      box.touch(this.game);
  }

  rightClick(box: Box){
    if(!this.game.lost){
      box.hasFlag() ? this.missingBombs += 1 : this.missingBombs -= 1;
      box.setFlag();
    }
    return false;
  }

}
