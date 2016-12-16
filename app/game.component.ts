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
  columnOfTiles: any = new Array(7);
  rows: any = Array.apply(0, Array(6)).map((element: any, index: any) => {return 5 - index;});
  
  private tileSelectedByPlayerOne: Map<string, boolean> = new Map<string, boolean>();
  private tileSelectedByPlayerTwo: Map<string, boolean> = new Map<string, boolean>();

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  resetGame(): void {
    this.stateService.resetGame();

    this.tileSelectedByPlayerOne = new Map<string, boolean>();
    this.tileSelectedByPlayerTwo = new Map<string, boolean>();
  }

  updateBoard(xValue: number): void {
    this.stateService.state.checkIfTileCanBePlayed(xValue);

    this.tileSelectedByPlayerOne = new Map<string, boolean>();
    this.tileSelectedByPlayerTwo = new Map<string, boolean>();

    this.stateService.getTileSelectedByPlayerOne().forEach((tile: any) => {
      this.tileSelectedByPlayerOne[String(tile)] = !this.tileSelectedByPlayerOne[String(tile)];
    });

    this.stateService.getTileSelectedByPlayerTwo().forEach((tile: any) => {
      this.tileSelectedByPlayerTwo[String(tile)] = !this.tileSelectedByPlayerTwo[String(tile)];
    });
  }
}
