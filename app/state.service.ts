import {Injectable} from "@angular/core";
import {WinnerService} from "./winner.service";
import {PlayerOneTurnState} from "./playerStates"
import {PlayerTwoTurnState} from "./playerStates"
import {PlayerOneWinnerState} from "./playerStates"
import {PlayerTwoWinnerState} from "./playerStates"
import {State} from "./playerStates"
import {TileService} from "./tile.service"

@Injectable()
export class StateService {

  playerOneTurnState: State;
  playerTwoTurnState: State;
  playerOneWinnerState: State;
  playerTwoWinnerState: State;
  state: State;

  constructor(private tileService: TileService, private winnerService: WinnerService) {
    this.playerOneTurnState = new PlayerOneTurnState(this, this.winnerService, this.tileService);
    this.playerOneWinnerState = new PlayerOneWinnerState();
    this.playerTwoTurnState = new PlayerTwoTurnState(this, this.winnerService, this.tileService);
    this.playerTwoWinnerState = new PlayerTwoWinnerState();
    this.state = this.playerOneTurnState;
  }

  resetGame(): void {
    this.tileService.resetGame();
    this.state = this.playerOneTurnState;
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

  getTileSelectedByPlayerOne(): any {
    return this.tileService.playerOneSelectedTiles;
  }

  getTileSelectedByPlayerTwo(): any {
    return this.tileService.playerTwoSelectedTiles;
  }
}
