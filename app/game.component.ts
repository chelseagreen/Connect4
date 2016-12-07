import {Component} from '@angular/core';
import {StateService} from "./state.service";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "game.component.html",
  styleUrls: ["game.component.css"],
})

export class GameComponent {

  stateService: StateService;

  constructor(stateService: StateService = new StateService) {
    this.stateService = stateService;
  }

  resetGame(): void {
    this.stateService = new StateService;
  }

  updateBoard(xValue: number): void {
    this.stateService.checkIfRowCanBePlayedAndSelectTile(xValue);
  }
}

