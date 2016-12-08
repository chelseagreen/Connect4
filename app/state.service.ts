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

  private winnerService: WinnerService = new WinnerService;

  constructor() {
    this.playerOneTurnState = new PlayerOneTurnState(this, this.winnerService);
    this.playerOneWinnerState = new PlayerOneWinnerState(this);
    this.playerTwoTurnState = new PlayerTwoTurnState(this, this.winnerService);
    this.playerTwoWinnerState = new PlayerTwoWinnerState(this);
    this.state = this.playerOneTurnState;
  }

  selectPlayer1Tile(x: number, y: number): void {
    this.playerOneSelectedTiles.push([x, y]);
    this.tileSelectedByPlayerOne[String([x,y])] = !this.tileSelectedByPlayerOne[String([x,y])];
  }

  selectPlayer2Tile(x: number, y: number): void {
    this.playerTwoSelectedTiles.push([x, y]);
    this.tileSelectedByPlayerTwo[String([x,y])] = !this.tileSelectedByPlayerTwo[String([x,y])];
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
