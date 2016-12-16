import { Injectable } from "@angular/core";

@Injectable()
export class WinnerService {

  isWinner: boolean = false;

  checkForWinningTiles(currentPlayerTiles: any) {
    this.sortFilledCellsByCoordinate(currentPlayerTiles, 0,1);
    this.sortFilledCellsByCoordinate(currentPlayerTiles, 1,0);
  }

  private sortFilledCellsByCoordinate(currentPlayer: any, coordOne: number, coordTwo: number): void {

    let filledCellCoordinates: any = [
      {value: 0, oppositeValues: []},
      {value: 1, oppositeValues: []},
      {value: 2, oppositeValues: []},
      {value: 3, oppositeValues: []},
      {value: 4, oppositeValues: []},
      {value: 5, oppositeValues: []},
      {value: 6, oppositeValues: []},
    ];

    currentPlayer.forEach((tile: any) => {
      for (let a = 0; a < filledCellCoordinates.length; a++) {

        let currentCoordinate = filledCellCoordinates[a];

        if (this.tileBelongsInRow(currentCoordinate.value, tile[coordOne])) {
          this.addTileToRow(currentCoordinate, tile[coordTwo]);
        }
      }
    });

    this.countForRowWinner(filledCellCoordinates);
    this.countForDiagonalWinner(filledCellCoordinates);
  }

  private addTileToRow(currentCoordinate: any, tileCoord: number): void {
    currentCoordinate.oppositeValues.push(tileCoord);
  }

  private tileBelongsInRow(tile1: any, tile2: any): boolean {
    return tile1 === tile2;
  }

  private countForRowWinner(filledCellCoordinates: any): void {
    filledCellCoordinates.forEach((coordinate: any) => {
      coordinate.oppositeValues.sort((a: any, b: any) => {
        return a - b;
      });

      let countOfFilledCellsOnCurrentCoordinate: number = 1;

      for (let i = 0; i < coordinate.oppositeValues.length-1; i++) {

        if (this.consecutiveTiles(coordinate.oppositeValues[i], coordinate.oppositeValues[i + 1])) {
          countOfFilledCellsOnCurrentCoordinate++
        }
        if (this.fourTilesInARow(countOfFilledCellsOnCurrentCoordinate)) {
          this.isWinner = true;
          return;
        }
        if (this.nonConsecutiveTiles(coordinate.oppositeValues[i], coordinate.oppositeValues[i + 1])) {
          countOfFilledCellsOnCurrentCoordinate = 1;
        }
      }
    });
  }

  private nonConsecutiveTiles(coordinate: any, coordinate2: any): boolean {
    return coordinate + 1 !== coordinate2;
  }

  private fourTilesInARow(countOfFilledCellsOnCurrentCoordinate: number): boolean {
    return countOfFilledCellsOnCurrentCoordinate === 4;
  }

  private consecutiveTiles(coordinate: any, coordinate2: any): boolean {
    return coordinate + 1 === coordinate2;
  }

  private countForDiagonalWinner(coordinateList: any): void {

    for (let i=0; i<coordinateList.length-3; i++) {
      let currentCoordList = coordinateList[i].oppositeValues;
      let secondCoordList = coordinateList[i+1].oppositeValues;
      let thirdCoordList = coordinateList[i+2].oppositeValues;
      let fourthCoordList = coordinateList[i+3].oppositeValues;

      for (let a=0; a<currentCoordList.length; a++) {

        if (this.coordIsFilled(secondCoordList, currentCoordList[a] + 1)
          && this.coordIsFilled(thirdCoordList, currentCoordList[a] + 2)
          && this.coordIsFilled(fourthCoordList, currentCoordList[a] + 3)) {
          this.isWinner = true;
          return;
        }

        if (this.coordIsFilled(secondCoordList, currentCoordList[a] - 1)
          && this.coordIsFilled(thirdCoordList, currentCoordList[a] - 2)
          && this.coordIsFilled(fourthCoordList, currentCoordList[a] - 3)) {
          this.isWinner = true;
          return;
        }
      }
    }
  }

  private coordIsFilled(coordList: any, coord: any) {
    return coordList.indexOf(coord) !== -1;
  }
}
