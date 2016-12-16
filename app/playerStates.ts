import {WinnerService} from "./winner.service"
import {StateService} from "./state.service";
import {TileService} from "./tile.service";

export interface State {

  stateText: string;

  checkIfTileCanBePlayed(xSelected: number): void;
}

export class PlayerOneTurnState implements State {

  stateText = "Player Red Turn";

  constructor(private stateService: StateService, private winnerService: WinnerService, private tileService: TileService) {}

  checkIfTileCanBePlayed(xSelected: number): void {

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

  constructor(private stateService: StateService, private winnerService: WinnerService, private tileService: TileService) {}

  checkIfTileCanBePlayed(xSelected: number): void {

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

  checkIfTileCanBePlayed(xSelected: number): void {}

  playTile(x: number, y: number) {}
}

export class PlayerTwoWinnerState implements State {

  stateText = "Player Yellow Wins!";

  checkIfTileCanBePlayed(xSelected: number): void {}

  playTile(x: number, y: number) {}
}
