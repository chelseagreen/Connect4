import { GameComponent } from './game.component';
import { WinnerService } from "./winner.service";
import { inject, async, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";

describe("connect 4", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [WinnerService],
      imports: [HttpModule]
    });
    TestBed.compileComponents();
  }));

  it("should initialize in player one turn state", () => {
    let connect4 = new GameComponent();
    expect(connect4.state).toEqual(connect4.playerOneTurnState);
  });

  it("should change state when player one plays a tile", inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    expect(connect4.state).toEqual(connect4.playerTwoTurnState);
  }));

  it("should switch player states back and forth", inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    expect(connect4.state).toEqual(connect4.playerOneTurnState);
  }));

  it("should add to both player selected tile lists", inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    connect4.checkIfRowCanBePlayedAndSelectTile(2);
    connect4.checkIfRowCanBePlayedAndSelectTile(3);
    expect(connect4.playerOneSelectedTiles).toEqual([[1,0], [3,0]]);
    expect(connect4.playerTwoSelectedTiles).toEqual([[2,0]]);
  }));

  it("should increase y value of tile each time tile is added to selected tile list", inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    connect4.checkIfRowCanBePlayedAndSelectTile(1);
    expect(connect4.playerOneSelectedTiles).toEqual([[1,0], [1,2]]);
    expect(connect4.playerTwoSelectedTiles).toEqual([[1,1]]);
  }));

  it('should show player one isWinner by consecutive y vals, equal x vals', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[3,0], [4,0], [2,0], [3,1], [3,2]];
    connect4.checkIfRowCanBePlayedAndSelectTile(3);
    expect(connect4.state).toEqual(connect4.playerOneWinnerState);
  }));

  it('should show player one isWinner by consecutive x vals, equal y vals', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[3,0], [4,0], [2,0], [3,1], [3,2]];
    connect4.checkIfRowCanBePlayedAndSelectTile(5);
    expect(connect4.state).toEqual(connect4.playerOneWinnerState);
  }));

  it('should not show isWinner if filled cells are filled with different player values', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[3,0], [4,0], [2,0], [3,2]];
    connect4.playerTwoSelectedTiles = [[3,1], [5,0], [0,0], [1,0]];
    connect4.checkIfRowCanBePlayedAndSelectTile(3);
    expect(connect4.state).toEqual(connect4.playerTwoTurnState);
  }));

  it('should let player 2 win if 4 y values in a row', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[1,0], [3,0], [3,1], [3,2]];
    connect4.playerTwoSelectedTiles = [[2,0], [2,1], [2,2]];
    connect4.state = connect4.playerTwoTurnState;
    connect4.checkIfRowCanBePlayedAndSelectTile(2);
    expect(connect4.state).toEqual(connect4.playerTwoWinnerState);
  }));

  it('should show a diagonal upward isWinner', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[0,0], [1,1], [2,2], [3,0], [3,2]];
    connect4.playerTwoSelectedTiles = [[1,0], [2,0], [2,1], [3,1], [4,0]];
    connect4.checkIfRowCanBePlayedAndSelectTile(3);
    expect(connect4.state).toEqual(connect4.playerOneWinnerState);
  }));

  it('should not show a diagonal when not four in a row', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[6,0], [5,1], [5,2], [4,1], [3,0]];
    connect4.playerTwoSelectedTiles = [[6,1], [5,0], [4,0], [4,2]];
    connect4.state = connect4.playerTwoTurnState;
    connect4.checkIfRowCanBePlayedAndSelectTile(3);
    expect(connect4.state).toEqual(connect4.playerOneTurnState);
  }));

  it('should show a diagonal downward isWinner', inject([WinnerService], () => {
    let connect4 = new GameComponent();
    connect4.playerOneSelectedTiles = [[5,0], [4,1], [3,2], [2,0], [2,2]];
    connect4.playerTwoSelectedTiles = [[4,0], [3,0], [3,1], [2,1], [1,0]];
    connect4.checkIfRowCanBePlayedAndSelectTile(2);
    expect(connect4.state).toEqual(connect4.playerOneWinnerState);
  }));
});
