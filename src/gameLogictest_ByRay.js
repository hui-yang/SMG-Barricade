describe("In Barricade", function() {
  var _gameLogic;

  beforeEach(module("myApp"));

  beforeEach(inject(function(gameLogic) {
    _gameLogic = gameLogic;
  }));

  function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
    expect (_gameLogic.isMoveOk({
      turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move
    })).toBe(true);
  }

  function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
    expect (_gameLogic.isMoveOk({
      turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move
    })).toBe(false);
  }

  it("0. dice move (+)", function() {
    expectMoveOk(0, {},
      [
        {setTurn: {turnIndex : 0}},
        {set: {key: 'type', value: 'dice'}},
        {setRandomInteger: {key: "dice", from: 1, to : 7}}
      ]);
  });

  it("0. dice move (-)", function() {
    expectIllegalMove(0, {},
      [
        {setTurn: {turnIndex : 0}},
        {set: {key: 'type', value: 'dice'}},
        {setRandomInteger: {key: "dice", from: 2, to : 7}}
      ]);
  });

  it("0. dice move (-) set wrong tunrIndex", function() {
    expectIllegalMove(0, {},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'dice'}},
        {setRandomInteger: {key: "dice", from: 2, to : 7}}
      ]);
  });

  it("1. step on empty spot (+) case 1", function() {
    expectMoveOk(0, {},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', '0', 'R', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', 'R', '0', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 13, to_col: 4, from_row: 14, from_col: 2}}},
        {set: {key: 'dice', value: 3}}
      ]);
  });

    it("1. step on empty spot (+) case 2", function() {
      expectMoveOk(0, {
        board: [
          ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
          ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
          ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
          ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
          ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
          ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
          ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
          ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
          ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
          ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
          ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
          ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
          ['0', '', '', '', 'R', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
          ['0', '0', 'R', '0', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
          ['', '0', '0', 'R', '', '0', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
          ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
        ],
        delta: {to_row: 13, to_col: 6, from_row: 14, from_col: 5},
        dice: 1,
        type: 'normal'
      },
        [
          {setTurn: {turnIndex : 1}},
          {set: {key: 'type', value: 'normal'}},
          {set: {key: 'board', value:
            [
              ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
              ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
              ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
              ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
              ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
              ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
              ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
              ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
              ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
              ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
              ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
              ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
              ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
              ['0', '0', 'R', '0', 'R', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
              ['', '0', '0', 'R', '', '0', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
              ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
            ]}},
          {set: {key: 'delta', value: {to_row: 13, to_col: 4, from_row: 12, from_col: 4}}},
          {set: {key: 'dice', value: 1}}
        ]);
    });

  it("more steps than dice shows (-)", function() {
    expectIllegalMove(0, {},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', 'R', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 11, to_col: 4, from_row: 14, from_col: 1}}},
        {set: {key: 'dice', value: 2}}
      ]);
  });

  it("step on barricade (+)", function() {
    expectMoveOk(0, {},
      [
        {setTurn: {turnIndex : 0}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['R', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 11, to_col: 0, from_row: 14, from_col: 1}}},
        {set: {key: 'dice', value: 5}}
      ]);
  });

  it("step on opponent (+)", function() {
    expectMoveOk(0, {board: [
      ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
      ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
      ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
      ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
      ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
      ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
      ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
      ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
      ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
      ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
      ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
      ['0', '0', 'R', '0', '0', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
      ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
      ['', 'R', '', 'R', '', 'G', '', '0', '', '', '', '', '', '', '', '', '']
    ],
    delta: {to_row: 13, to_col: 7, from_row: 15, from_col: 7},
    dice: 3,
    type: 'normal'},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', '0', '0', '0', '0', 'R', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 13, to_col: 7, from_row: 13, from_col: 2}}},
        {set: {key: 'dice', value: 5}}
      ]);
  });

  it("step on friendly pawn (-)", function() {
    expectIllegalMove(0, {board: [
      ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
      ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
      ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
      ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
      ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
      ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
      ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
      ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
      ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
      ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
      ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
      ['0', '0', '0', 'R', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
      ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
      ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
    ],
    delta: {to_row: 13, to_col: 6, from_row: 14, from_col: 5},
    dice: 1,
    type: 'normal'},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', 'R', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', '0', '0', 'R', '', '', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 13, to_col: 3, from_row: 14, from_col: 2}}},
        {set: {key: 'dice', value: 2}}
      ]);
  });

  it("walk past a friendly pawn (+)", function() {
    expectMoveOk(0, {board: [
      ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
      ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
      ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
      ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
      ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
      ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
      ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
      ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
      ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
      ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
      ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
      ['0', '0', '0', 'R', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
      ['', '0', 'R', 'R', '', '0', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
      ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
    ],
    delta: {to_row: 13, to_col: 6, from_row: 14, from_col: 5},
    dice: 1,
    type: 'normal'},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', 'R', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', 'R', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', '0', '0', 'R', '', '0', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 12, to_col: 4, from_row: 14, from_col: 2}}},
        {set: {key: 'dice', value: 4}}
      ]);
  });

  it("walk past a barricade (-)", function() {
    expectIllegalMove(0, {board: [
      ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
      ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
      ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
      ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
      ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
      ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
      ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
      ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
      ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
      ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
      ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
      ['0', '0', '0', 'R', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
      ['', '0', 'R', 'R', '', '0', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
      ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
    ],
    delta: {to_row: 13, to_col: 6, from_row: 14, from_col: 5},
    dice: 1,
    type: 'normal'},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'normal'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', 'R', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', '0', '0', '0', 'G', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
            ['', '0', 'R', 'R', '', '0', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 11, to_col: 3, from_row: 13, from_col: 3}}},
        {set: {key: 'dice', value: 4}}
      ]);
  });

  it("place a barricade (+)", function() {
    expectMoveOk(0, {board: [
      ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
      ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
      ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
      ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
      ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
      ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
      ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
      ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
      ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
      ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
      ['1', '0', '0', '0', 'R', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
      ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'], // 13
      ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
      ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
    ],
    delta: {to_row: 11, to_col: 0, from_row: 14, from_col: 1},
    dice: 5,
    type: 'normal'},
      [
        {setTurn: {turnIndex : 1}},
        {set: {key: 'type', value: 'barricade'}},
        {set: {key: 'board', value:
          [
            ['', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', ''], // 0
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 1
            ['0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0'], // 2
            ['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0'], // 3
            ['', '', '', '', '', '', '', '', '1', '', '', '', '', '', '', '', ''], // 4
            ['', '', '', '', '', '', '0', '0', '1', '0', '0', '', '', '', '', '', ''], // 5
            ['', '', '', '', '', '', '0', '', '', '', '0', '', '', '', '', '', ''], // 6
            ['', '', '', '', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', '', '', ''], // 7
            ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', '', ''], // 8
            ['', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', ''], // 9
            ['', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', ''], // 10
            ['1', '0', '0', '0', 'R', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1'], // 11
            ['0', '', '', '', '0', '', '', '', '0', '', '', '', '0', '', '', '', '0'], // 12
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'], // 13
            ['', '0', 'R', 'R', '', 'G', 'G', 'G', '', '', '', '', '', '', '', '', ''], // 14
            ['', 'R', '', 'R', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '']
          ]}},
        {set: {key: 'delta', value: {to_row: 13, to_col: 16}}},
        {set: {key: 'dice', value: -1}}
      ]);
  });
})