import { Injectable } from "@angular/core";

@Injectable()
export class WinnerService {

  isWinner: boolean = false;

  checkForWinningTiles(currentPlayerTiles: any) {
    this.sortFilledCellsByCoordinate(currentPlayerTiles, 0,1);
    this.sortFilledCellsByCoordinate(currentPlayerTiles, 1,0);
  }

  sortFilledCellsByCoordinate(currentPlayer: any, axis1: number, axis2: number): void {

    let filledCellCoordinates: any = [
      {coordinateValue: 0, oppositeCoordinateValues: []},
      {coordinateValue: 1, oppositeCoordinateValues: []},
      {coordinateValue: 2, oppositeCoordinateValues: []},
      {coordinateValue: 3, oppositeCoordinateValues: []},
      {coordinateValue: 4, oppositeCoordinateValues: []},
      {coordinateValue: 5, oppositeCoordinateValues: []},
      {coordinateValue: 6, oppositeCoordinateValues: []},
    ];

    currentPlayer.forEach((tile: any) => {
      for (let a = 0; a < filledCellCoordinates.length; a++) {
        if (filledCellCoordinates[a].coordinateValue === tile[axis1]) {
          filledCellCoordinates[a].oppositeCoordinateValues.push(tile[axis2]);
        }
      }
    });

    this.countForRowWinner(filledCellCoordinates);
    this.countForDiagonalWinner(filledCellCoordinates);
  }

  private countForRowWinner(filledCellCoordinates: any) {
    filledCellCoordinates.forEach((coordinate: any) => {
      coordinate.oppositeCoordinateValues.sort((a: any, b: any) => {
        return a - b;
      });
      let countOfFilledCellsOnCurrentCoordinate: number = 1;

      for (let i = 0; i < coordinate.oppositeCoordinateValues.length-1; i++) {
        if (coordinate.oppositeCoordinateValues[i] + 1 == coordinate.oppositeCoordinateValues[i + 1]) {
          countOfFilledCellsOnCurrentCoordinate++
        }
        if (countOfFilledCellsOnCurrentCoordinate === 4) {
          this.isWinner = true;
          return;
        }
        if (coordinate.oppositeCoordinateValues[i] + 1 !== coordinate.oppositeCoordinateValues[i + 1]) {
          countOfFilledCellsOnCurrentCoordinate = 1;
        }
      }
    });
  }

  countForDiagonalWinner(coordinateList: any) {
    for (let i=0; i<coordinateList.length-3; i++) {
      let currentCoordList = coordinateList[i].oppositeCoordinateValues;
      let secondCoordList = coordinateList[i+1].oppositeCoordinateValues;
      let thirdCoordList = coordinateList[i+2].oppositeCoordinateValues;
      let fourthCoordList = coordinateList[i+3].oppositeCoordinateValues;

      for (let a=0; a<currentCoordList.length; a++) {

        if (secondCoordList.indexOf(currentCoordList[a] + 1) !== -1
          && thirdCoordList.indexOf(currentCoordList[a] + 2) !== -1
          && fourthCoordList.indexOf(currentCoordList[a] + 3) !== -1) {
          this.isWinner = true;
          return;
        }

        if (secondCoordList.indexOf(currentCoordList[a] - 1) !== -1
          && thirdCoordList.indexOf(currentCoordList[a] - 2) !== -1
          && fourthCoordList.indexOf(currentCoordList[a] - 3) !== -1) {
          this.isWinner = true;
          return;
        }
      }
    }
  }
}
