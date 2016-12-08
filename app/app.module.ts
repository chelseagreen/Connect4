import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent }  from './game.component';
import {WinnerService} from "./winner.service";
import {StateService} from "./state.service";
import {TileService} from "./tile.service";


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ GameComponent ],
  providers: [ WinnerService, StateService, TileService ],
  bootstrap: [ GameComponent ]
})
export class AppModule { }
