export class Game {
  bombs: number;
  height: number;
  width: number;
  boxs: Box[][];


  constructor(width: number, height: number, bombs: number){
    this.width = width;
    this.height = height;
    this.bombs = bombs;
    this.initBoxs();
  }

  private initBoxs(){
    this.boxs = [];
    for (let i = 0; i < this.height; i++) {
      this.boxs[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.boxs[i][j] = new Box();
      }
    }
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.boxs[i][j].setCloseAmount(i, j, this.boxs);
      }
    }
  }

  lose(){

  }

}

export class Box{
  private hasBomb: boolean;
  private stateBox: StateBox;
  private closeAmount: number | null;

  constructor(){
    this.stateBox = new StateBoxWithoutTouching();
  }

  touch() { this.stateBox.touch(this) }
  getBomb() { return this.hasBomb }
  setBomb(hasBomb: boolean) { this.hasBomb = hasBomb }
  setState(stateBox: StateBox) { this.stateBox = stateBox }

  setFlag(){ this.stateBox.flag(this) }
  getStyle(box: Box): string{ return this.stateBox.getStyle(this) }
  hasFlag() { return this.stateBox.hasFlag() }
  isTouched() { return this.stateBox.isTouched() }

  getCloseAmount() { return this.closeAmount };
  setCloseAmount(x: number, y: number, boxs: Box[][]) {
    let ammountBombs = 0;
    let height = boxs.length;
    let width = boxs[0].length;
    if(y != 0){
      if(x != 0){
        ammountBombs += boxs[x-1][y-1].getBomb() ? 1 : 0; //top left
      }
      ammountBombs += boxs[x][y-1].getBomb() ? 1 : 0; //top middle
      if(x != width -1){
        ammountBombs += boxs[x+1][y-1].getBomb() ? 1 : 0; //top right
      }
    }
    if(x != 0){
      ammountBombs += boxs[x-1][y].getBomb() ? 1 : 0; //left
    }
    if(x != width -1){
      ammountBombs += boxs[x+1][y].getBomb() ? 1 : 0; //right
    }
    if(y != height - 1){
      if(x != 0){
        ammountBombs += boxs[x-1][y+1].getBomb() ? 1 : 0; //bottom left
      }
      ammountBombs += boxs[x][y+1].getBomb() ? 1 : 0; //bottom middle
      if(x != width -1){
        ammountBombs += boxs[x+1][y+1].getBomb() ? 1 : 0; //bottom left
      }
    }
    this.closeAmount = ammountBombs > 0 ? ammountBombs : null;
  }

}

export abstract class StateBox{

  flag(box: Box){
  }

  getStyle(box: Box){
    return "box";
  }

  touch(box: Box){
  }

  hasFlag(){
    return false;
  }

  isTouched(){
    return false;
  }

}

export class StateBoxTouched extends StateBox{

  override getStyle(box: Box){
    let amount = box.getCloseAmount();
    if(amount)
      return `box number-${amount}`;
    else
      return `box`;
  }

  override isTouched(){
    return true;
  }
}

export class StateBoxWithoutTouching extends StateBox{

  override flag(box: Box){
    box.setState(new StateBoxWithFlag());
  }

  override getStyle(box: Box){
    return "box not-touched";
  }

  override touch(box: Box): void {
    box.setState(new StateBoxTouched());
  }

}

export class StateBoxWithFlag extends StateBox{

  override flag(box: Box){
    box.setState(new StateBoxWithoutTouching());
  }

  override getStyle(box: Box){
    return "box not-touched";
  }

  override touch(box: Box): void {

  }

  override hasFlag(){
    return true;
  }

}
