// Created by Zhuoran
// Seems the game does not work....

describe('Barricade', function() {
  'use strict';

  beforeEach(function() {
    browser.get('http://localhost:32232/game.min.html');
  });
/*
  function setMatchState(matchState, playMode) {
    browser.executeScript(function(matchStateInJson, playMode) {
      var stateService = window.e2e_test_stateService;
      stateService.setMatchState(angular.fromJson(matchStateInJson));
      stateService.setPlayMode(angular.fromJson(playMode));
      angular.element(document).scope().$apply();
    }, JSON.stringify(matchState), JSON.stringify(playMode));
  }
*/
});
