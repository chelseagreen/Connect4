import {Injectable} from "@angular/core";
import {WinnerService} from "./winner.service";
import {PlayerOneTurnState} from "./playerStates"
import {PlayerTwoTurnState} from "./playerStates"
import {PlayerOneWinnerState} from "./playerStates"
import {PlayerTwoWinnerState} from "./playerStates"
import {State} from "./playerStates"

@Injectable()
export class StateService {

  playerOneTurnState: State;
  playerTwoTurnState: State;
  playerOneWinnerState: State;
  playerTwoWinnerState: State;
  state: State;

  playerOneSelectedTiles: any = [];
  playerTwoSelectedTiles: any = [];

  tileSelectedByPlayerOne: Map<string, boolean> = new Map<string, boolean>();
  tileSelectedByPlayerTwo: Map<string, boolean> = new Map<string, boolean>();

  winnerService: WinnerService = new WinnerService;

  constructor() {
    this.playerOneTurnState = new PlayerOneTurnState(this, this.winnerService);
    this.playerOneWinnerState = new PlayerOneWinnerState(this);
    this.playerTwoTurnState = new PlayerTwoTurnState(this, this.winnerService);
    this.playerTwoWinnerState = new PlayerTwoWinnerState(this);
    this.state = this.playerOneTurnState;
  }

  checkIfRowCanBePlayedAndSelectTile(xSelected: number): void {

    let tilesValuesPopulatingSelectedColumn = this.playerOneSelectedTiles.concat(this.playerTwoSelectedTiles).filter((tile: any) => {
      return tile[0] === xSelected;
    });

    if (!tilesValuesPopulatingSelectedColumn) {
      this.state.playTile(xSelected, 0);
    }
    if (tilesValuesPopulatingSelectedColumn.length < 6) {
      this.state.playTile(xSelected, tilesValuesPopulatingSelectedColumn.length);
    }
  }

  setState(state: State): void {
    this.state = state;
  }

  getPlayerOneTurnState(): State {
    return this.playerOneTurnState;
  }

  getPlayerTwoTurnState(): State {
    return this.playerTwoTurnState;
  }

  getPlayerOneWinnerState(): State {
    return this.playerOneWinnerState;
  }

  getPlayerTwoWinnerState(): State {
    return this.playerTwoWinnerState;
  }
}
