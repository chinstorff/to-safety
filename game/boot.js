Game = {};

var paddle;
var ball;

var bounds;
var goals;
var death;

var cursors;

var GameState = { InProgress: 0, Lost: 1, Won: 2};
var currentGameState = GameState.inProgress;

var resultText;

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	game.load.image('loading', 'assets/img/loading.png')
    },

    create: function () {
	game.state.start('Load');
    }
};
