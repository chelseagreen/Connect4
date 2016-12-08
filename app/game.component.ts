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

  private tileSelectedByPlayerOne: Map<string, boolean> = new Map<string, boolean>();
  private tileSelectedByPlayerTwo: Map<string, boolean> = new Map<string, boolean>();

  constructor(stateService: StateService = new StateService) {
    this.stateService = stateService;
  }

  resetGame(): void {
    this.stateService = new StateService;
    this.tileSelectedByPlayerOne = new Map<string, boolean>();
    this.tileSelectedByPlayerTwo = new Map<string, boolean>();
  }

  updateBoard(xValue: number): void {
    this.stateService.state.checkIfRowCanBePlayedAndSelectTile(xValue);

    this.tileSelectedByPlayerOne = this.stateService.tileSelectedByPlayerOne;
    this.tileSelectedByPlayerTwo = this.stateService.tileSelectedByPlayerTwo;
  }
}
