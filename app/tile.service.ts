import {Injectable} from "@angular/core";

@Injectable()
export class TileService {

  playerOneSelectedTiles: any = [];
  playerTwoSelectedTiles: any = [];

  tileSelectedByPlayerOne: Map<string, boolean> = new Map<string, boolean>();
  tileSelectedByPlayerTwo: Map<string, boolean> = new Map<string, boolean>();

  selectPlayer1Tile(x: number, y: number): void {
    this.playerOneSelectedTiles.push([x, y]);
    this.tileSelectedByPlayerOne[String([x,y])] = !this.tileSelectedByPlayerOne[String([x,y])];
  }

  selectPlayer2Tile(x: number, y: number): void {
    this.playerTwoSelectedTiles.push([x, y]);
    this.tileSelectedByPlayerTwo[String([x,y])] = !this.tileSelectedByPlayerTwo[String([x,y])];
  }
}
