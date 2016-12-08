import {WinnerService} from "./winner.service"
import {StateService} from "./state.service";

export interface State {
  playTile(x: number, y: number): void;
  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void;
  stateText: string;
}

export class PlayerOneTurnState implements State {

  stateText = "Player Red Turn";

  private stateService: StateService;
  private winnerService: WinnerService;

  constructor(stateService: StateService, winnerService: WinnerService) {
    this.winnerService = winnerService;
    this.stateService = stateService;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {

    let tilesValuesPopulatingSelectedColumn = this.stateService.playerOneSelectedTiles.concat(this.stateService.playerTwoSelectedTiles).filter((tile: any) => {
      return tile[0] === xSelected;
    });

    if (!tilesValuesPopulatingSelectedColumn) {
      this.playTile(xSelected, 0);
    }
    if (tilesValuesPopulatingSelectedColumn.length < 6) {
      this.playTile(xSelected, tilesValuesPopulatingSelectedColumn.length);
    }
  }

  playTile(x: number, y: number): void {
    this.stateService.selectPlayer1Tile(x ,y);
    this.winnerService.checkForWinningTiles(this.stateService.playerOneSelectedTiles);

    (this.winnerService.isWinner)
      ? this.stateService.setState(this.stateService.getPlayerOneWinnerState())
      : this.stateService.setState(this.stateService.getPlayerTwoTurnState());
  }
}

export class PlayerTwoTurnState implements State {

  stateText = "Player Yellow Turn";

  private winnerService: WinnerService;
  private stateService: StateService;

  constructor(stateService: StateService, winnerService: WinnerService) {
    this.winnerService = winnerService;
    this.stateService = stateService;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {

    let tilesValuesPopulatingSelectedColumn = this.stateService.playerOneSelectedTiles.concat(this.stateService.playerTwoSelectedTiles).filter((tile: any) => {
      return tile[0] === xSelected;
    });

    if (!tilesValuesPopulatingSelectedColumn) {
      this.playTile(xSelected, 0);
    }
    if (tilesValuesPopulatingSelectedColumn.length < 6) {
      this.playTile(xSelected, tilesValuesPopulatingSelectedColumn.length);
    }
  }

  playTile(x: number, y: number): void {
    this.stateService.selectPlayer2Tile(x, y);
    this.winnerService.checkForWinningTiles(this.stateService.playerTwoSelectedTiles);

    (this.winnerService.isWinner)
      ? this.stateService.setState(this.stateService.getPlayerTwoWinnerState())
      : this.stateService.setState(this.stateService.getPlayerOneTurnState());
  }
}

export class PlayerOneWinnerState implements State {

  stateText = "Player Red Wins!";

  private stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {}

  playTile(x: number, y: number) {}
}

export class PlayerTwoWinnerState implements State {

  stateText = "Player Yellow Wins!";

  private stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {}

  playTile(x: number, y: number) {}
}
