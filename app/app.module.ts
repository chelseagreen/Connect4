import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent }  from './game.component';
import {WinnerService} from "./winner.service";
import {StateService} from "./state.service";


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ GameComponent ],
  providers: [ WinnerService, StateService ],
  bootstrap: [ GameComponent ]
})
export class AppModule { }
