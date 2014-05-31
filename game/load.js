Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	game.stage.backgroundColor = '#acf';
	preload = game.add.sprite(game.world.width / 3, game.world.height / 2, 'loading');
	game.load.setPreloadSprite(preload);

	game.load.image('rectangle', 'assets/img/rectangle.png');
	game.load.image('ball', 'assets/img/ball.png');
	game.load.image('goal', 'assets/img/goal.png');
    },

    create: function () {
	game.state.start('Menu');
    }
}
