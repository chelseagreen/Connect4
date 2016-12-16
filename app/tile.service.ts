import {Injectable} from "@angular/core";

@Injectable()
export class TileService {

  playerOneSelectedTiles: any = [];
  playerTwoSelectedTiles: any = [];

  resetGame(): void {
    this.playerOneSelectedTiles = [];
    this.playerTwoSelectedTiles = [];
  }

  selectPlayer1Tile(x: number, y: number): void {
    this.playerOneSelectedTiles.push([x, y]);
  }

  selectPlayer2Tile(x: number, y: number): void {
    this.playerTwoSelectedTiles.push([x, y]);
  }
}
