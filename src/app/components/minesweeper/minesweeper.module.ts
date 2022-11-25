import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameFormComponent } from './game-form/game-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';



@NgModule({
  declarations: [
    GameFormComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ], exports: [
    GameFormComponent,
    GameComponent,
  ]
})
export class MinesweeperModule { }
