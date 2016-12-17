import {WinnerService} from "./winner.service"
import {StateService} from "./state.service";
import {TileService} from "./tile.service";

export interface State {

  stateText: string;
  stateClass: string;

  checkIfTileCanBePlayed(xSelected: number): void;
}

export abstract class PlayerTurnState implements State {
  stateText: string;
  stateClass: string;

  constructor(protected stateService: StateService, protected winnerService: WinnerService, protected tileService: TileService) {}

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

  protected abstract playTile(x: number, y: number): void;

}

export class PlayerOneTurnState extends PlayerTurnState {

  stateText = "Player Red Turn";
  stateClass = "player-turn player-one";

  protected playTile(x: number, y: number): void {
    this.tileService.selectPlayer1Tile(x,y);
    this.winnerService.checkForWinningTiles(this.tileService.playerOneSelectedTiles);

    if (this.winnerService.isWinner) {
      this.stateService.setState(this.stateService.getPlayerOneWinnerState());
    }
    else if (this.winnerService.playerTurns === 42) {
      this.stateService.setState(this.stateService.getPlayerTieState());
    }
    else {
      this.stateService.setState(this.stateService.getPlayerTwoTurnState());
    }
  }
}

export class PlayerTwoTurnState extends PlayerTurnState {

  stateText = "Player Yellow Turn";
  stateClass = "player-turn player-two";

  protected playTile(x: number, y: number): void {
    this.tileService.selectPlayer2Tile(x, y);
    this.winnerService.checkForWinningTiles(this.tileService.playerTwoSelectedTiles);

    if (this.winnerService.isWinner) {
      this.stateService.setState(this.stateService.getPlayerTwoWinnerState());
    }
    else if (this.winnerService.playerTurns === 42) {
      this.stateService.setState(this.stateService.getPlayerTieState());
    }
    else {
      this.stateService.setState(this.stateService.getPlayerOneTurnState());
    }
  }
}

export class PlayerOneWinnerState implements State {

  stateText = "Player Red Wins!";
  stateClass = "player-one";

  checkIfTileCanBePlayed(xSelected: number): void {}

}

export class PlayerTwoWinnerState implements State {

  stateText = "Player Yellow Wins!";
  stateClass = "player-two";

  checkIfTileCanBePlayed(xSelected: number): void {}

}

export class PlayerTieState implements State {

  stateText = "Tie Game!!!!";
  stateClass = "";

  checkIfTileCanBePlayed(xSelected: number): void {}

}
