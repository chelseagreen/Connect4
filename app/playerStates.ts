import {WinnerService} from "./winner.service"
import {GameComponent} from "./game.component"

export interface State {
  playTile(x: number, y: number): void;
}

export class PlayerOneTurnState implements State {

  connect4Game: GameComponent;
  winnerService: WinnerService;

  constructor(connect4Game: GameComponent, winnerService: WinnerService) {
    this.connect4Game = connect4Game;
    this.winnerService = winnerService;
  }

  playTile(x: number, y: number): void {
    this.connect4Game.playerOneSelectedTiles.push([x, y]);
    this.connect4Game.tileSelectedByPlayerOne["x:"+String(x)+",y:"+String(y)] = !this.connect4Game.tileSelectedByPlayerOne["x:"+String(x)+",y:"+String(y)];

    this.winnerService.checkForWinningTiles(this.connect4Game.playerOneSelectedTiles);

    (this.winnerService.isWinner)
      ? this.connect4Game.setState(this.connect4Game.getPlayerOneWinnerState())
      : this.connect4Game.setState(this.connect4Game.getPlayerTwoTurnState());
  }
}

export class PlayerTwoTurnState implements State {

  connect4Game: GameComponent;
  winnerService: WinnerService;

  constructor(connect4Game: GameComponent, winnerService: WinnerService) {
    this.connect4Game = connect4Game;
    this.winnerService = winnerService;
  }

  playTile(x: number, y: number): void {
    this.connect4Game.playerTwoSelectedTiles.push([x, y]);
    this.connect4Game.tileSelectedByPlayerTwo["x:"+String(x)+",y:"+String(y)] = !this.connect4Game.tileSelectedByPlayerOne["x:"+String(x)+",y:"+String(y)];
    this.winnerService.checkForWinningTiles(this.connect4Game.playerTwoSelectedTiles);

    (this.winnerService.isWinner)
      ? this.connect4Game.setState(this.connect4Game.getPlayerTwoWinnerState())
      : this.connect4Game.setState(this.connect4Game.getPlayerOneTurnState());
  }
}

export class PlayerOneWinnerState implements State {

  connect4Game: GameComponent;

  constructor(connect4Game: GameComponent) {
    this.connect4Game = connect4Game;
  }

  playTile(x: number, y: number) {}
}

export class PlayerTwoWinnerState implements State {

  connect4Game: GameComponent;

  constructor(connect4Game: GameComponent) {
    this.connect4Game = connect4Game;
  }

  playTile(x: number, y: number) {}
}
