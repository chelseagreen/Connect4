import {WinnerService} from "./winner.service"
import {StateService} from "./state.service";
import {TileService} from "./tile.service";

export interface State {

  stateText: string;

  playTile(x: number, y: number): void;
  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void;
}

export class PlayerOneTurnState implements State {

  stateText = "Player Red Turn";

  private stateService: StateService;
  private winnerService: WinnerService;
  tileService: TileService;

  constructor(stateService: StateService, winnerService: WinnerService, tileService: TileService) {
    this.winnerService = winnerService;
    this.stateService = stateService;
    this.tileService = tileService;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {

    let tilesValuesPopulatingSelectedColumn = this.tileService.playerOneSelectedTiles.concat(this.tileService.playerTwoSelectedTiles).filter((tile: any) => {
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
    this.tileService.selectPlayer1Tile(x,y);
    this.winnerService.checkForWinningTiles(this.tileService.playerOneSelectedTiles);

    (this.winnerService.isWinner)
      ? this.stateService.setState(this.stateService.getPlayerOneWinnerState())
      : this.stateService.setState(this.stateService.getPlayerTwoTurnState());
  }
}

export class PlayerTwoTurnState implements State {

  stateText = "Player Yellow Turn";

  private stateService: StateService;
  private winnerService: WinnerService;
  tileService: TileService;

  constructor(stateService: StateService, winnerService: WinnerService, tileService: TileService) {
    this.winnerService = winnerService;
    this.stateService = stateService;
    this.tileService = tileService;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {

    let tilesValuesPopulatingSelectedColumn = this.tileService.playerOneSelectedTiles.concat(this.tileService.playerTwoSelectedTiles).filter((tile: any) => {
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
    this.tileService.selectPlayer2Tile(x,y);
    this.winnerService.checkForWinningTiles(this.tileService.playerTwoSelectedTiles);

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
