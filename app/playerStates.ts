import {WinnerService} from "./winner.service"
import {StateService} from "./state.service";

export interface State {
  playTile(x: number, y: number): void;
}

export class PlayerOneTurnState implements State {

  stateService: StateService;
  winnerService: WinnerService;

  constructor(stateService: StateService, winnerService: WinnerService) {
    this.winnerService = winnerService;
    this.stateService = stateService;
  }

  playTile(x: number, y: number): void {
    this.stateService.playerOneSelectedTiles.push([x, y]);
    this.stateService.tileSelectedByPlayerOne[String([x,y])] = !this.stateService.tileSelectedByPlayerOne[String([x,y])];
    this.winnerService.checkForWinningTiles(this.stateService.playerOneSelectedTiles);

    (this.winnerService.isWinner)
      ? this.stateService.setState(this.stateService.getPlayerOneWinnerState())
      : this.stateService.setState(this.stateService.getPlayerTwoTurnState());
  }
}

export class PlayerTwoTurnState implements State {

  winnerService: WinnerService;
  stateService: StateService;

  constructor(stateService: StateService, winnerService: WinnerService) {
    this.winnerService = winnerService;
    this.stateService = stateService;
  }

  playTile(x: number, y: number): void {
    this.stateService.playerTwoSelectedTiles.push([x, y]);
    this.stateService.tileSelectedByPlayerTwo[String([x,y])] = !this.stateService.tileSelectedByPlayerTwo[String([x,y])];
    this.winnerService.checkForWinningTiles(this.stateService.playerTwoSelectedTiles);

    (this.winnerService.isWinner)
      ? this.stateService.setState(this.stateService.getPlayerTwoWinnerState())
      : this.stateService.setState(this.stateService.getPlayerOneTurnState());
  }
}

export class PlayerOneWinnerState implements State {

  stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  playTile(x: number, y: number) {}
}

export class PlayerTwoWinnerState implements State {

  stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  playTile(x: number, y: number) {}
}
