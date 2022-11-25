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
  }

  lose(){

  }

}

export class Box{
  private hasBomb: boolean;
  private stateBox: StateBox;

  constructor(){
    this.stateBox = new StateBoxWithoutTouching();
  }

  getBomb() { return this.hasBomb }
  setBomb(hasBomb: boolean) { this.hasBomb = hasBomb }
  setState(stateBox: StateBox) { this.stateBox = stateBox }

  setFlag(){ this.stateBox.flag(this) }
  getStyle(): string{ return this.stateBox.getStyle()  }

}

export abstract class StateBox{

  flag(box: Box){
  }

  getStyle(){
    return "box";
  }

}

export class StateBoxTouched extends StateBox{

  override getStyle(){
    return "box number";
  }
}

export class StateBoxWithoutTouching extends StateBox{

  override flag(box: Box){
    box.setState(new StateBoxWithFlag());
  }

  override getStyle(){
    return "box not-touched";
  }

}

export class StateBoxWithFlag extends StateBox{

  override flag(box: Box){
    box.setState(new StateBoxWithoutTouching());
  }

  override getStyle(){
    return "box not-touched";
  }

}
