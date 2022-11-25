import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  gameForm: FormGroup;
  @Output() game: EventEmitter<Game> = new EventEmitter<Game>();
  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(){
    this.gameForm = this.formBuilder.group({
      difficulty: ['beginner', [Validators.required]],
      height: [],
      width: [],
      bombs: [],
    });
  }

  setDifficulty(difficulty: string){
    if(difficulty == "custom"){
      this.gameForm.controls['height'].addValidators([Validators.required, Validators.pattern(/^[0-9]*$/i)]);
      this.gameForm.controls['width'].addValidators([Validators.required, Validators.pattern(/^[0-9]*$/i )]);
      this.gameForm.controls['bombs'].addValidators([Validators.required, Validators.pattern(/^[0-9]*$/i ), ]);
    } else{
      this.gameForm.controls['height'].clearValidators();
      this.gameForm.controls['width'].clearValidators();
      this.gameForm.controls['bombs'].clearValidators();
    }
  }

  play(){
    let width  = this.gameForm.controls['width'].value;
    let height  = this.gameForm.controls['height'].value;
    let bombs  = this.gameForm.controls['bombs'].value;
    switch (this.gameForm.controls['difficulty'].value) {
      case 'beginner':
        width = 9;
        height = 9;
        bombs = 10;
        break;
      case 'medium':
        width = 16;
        height = 16;
        bombs = 40;
        break;
      case 'expert':
        width = 30;
        height = 16;
        bombs = 99;
        break;
      default:
        break;
    }
    this.game.emit(new Game(width, height, bombs));
  }

}
