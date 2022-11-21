import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  gameForm: FormGroup;
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


  }

}
