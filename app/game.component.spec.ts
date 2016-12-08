import { GameComponent } from './game.component';
import { async, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";

describe("connect 4", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
    });
    TestBed.compileComponents();
  }));

  it("should initialize in player one turn state", () => {
    let connect4 = new GameComponent();
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneTurnState);
  });

  it("should change state when player one plays a tile", () => {
    let connect4 = new GameComponent();
    connect4.updateBoard(1);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerTwoTurnState);
  });

  it("should switch player states back and forth", () => {
    let connect4 = new GameComponent();
    connect4.updateBoard(1);
    connect4.updateBoard(1);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneTurnState);
  });

  it("should add to both player selected tile lists", () => {
    let connect4 = new GameComponent();
    connect4.updateBoard(1);
    connect4.updateBoard(2);
    connect4.updateBoard(3);
    expect(connect4.stateService.playerOneSelectedTiles).toEqual([[1,0], [3,0]]);
    expect(connect4.stateService.playerTwoSelectedTiles).toEqual([[2,0]]);
  });

  it("should increase y value of tile each time tile is added to selected tile list", () => {
    let connect4 = new GameComponent();
    connect4.updateBoard(1);
    connect4.updateBoard(1);
    connect4.updateBoard(1);
    expect(connect4.stateService.playerOneSelectedTiles).toEqual([[1,0], [1,2]]);
    expect(connect4.stateService.playerTwoSelectedTiles).toEqual([[1,1]]);
  });

  it('should show player one isWinner by consecutive y vals, equal x vals', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[3,0], [4,0], [2,0], [3,1], [3,2]];
    connect4.updateBoard(3);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneWinnerState);
  });

  it('should show player one isWinner by consecutive x vals, equal y vals', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[3,0], [4,0], [2,0], [3,1], [3,2]];
    connect4.updateBoard(5);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneWinnerState);
  });

  it('should not show isWinner if filled cells are filled with different player values', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[3,0], [4,0], [2,0], [3,2]];
    connect4.stateService.playerTwoSelectedTiles = [[3,1], [5,0], [0,0], [1,0]];
    connect4.updateBoard(3);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerTwoTurnState);
  });

  it('should let player 2 win if 4 y values in a row', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[1,0], [3,0], [3,1], [3,2]];
    connect4.stateService.playerTwoSelectedTiles = [[2,0], [2,1], [2,2]];
    connect4.stateService.state = connect4.stateService.playerTwoTurnState;
    connect4.updateBoard(2);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerTwoWinnerState);
  });

  it('should show a diagonal upward isWinner', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[0,0], [1,1], [2,2], [3,0], [3,2]];
    connect4.stateService.playerTwoSelectedTiles = [[1,0], [2,0], [2,1], [3,1], [4,0]];
    connect4.updateBoard(3);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneWinnerState);
  });

  it('should not show a diagonal when not four in a row', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[6,0], [5,1], [5,2], [4,1], [3,0]];
    connect4.stateService.playerTwoSelectedTiles = [[6,1], [5,0], [4,0], [4,2]];
    connect4.stateService.state = connect4.stateService.playerTwoTurnState;
    connect4.updateBoard(3);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneTurnState);
  });

  it('should show a diagonal downward isWinner', () => {
    let connect4 = new GameComponent();
    connect4.stateService.playerOneSelectedTiles = [[5,0], [4,1], [3,2], [2,0], [2,2]];
    connect4.stateService.playerTwoSelectedTiles = [[4,0], [3,0], [3,1], [2,1], [1,0]];
    connect4.updateBoard(2);
    expect(connect4.stateService.state).toEqual(connect4.stateService.playerOneWinnerState);
  });
});
