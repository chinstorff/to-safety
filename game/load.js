Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	game.stage.backgroundColor = '#acf';
	preload = game.add.sprite(game.world.width / 3, game.world.height / 2, 'loading');
	game.load.setPreloadSprite(preload);

	game.load.image('rectangle', 'assets/img/rectangle.png');
	game.load.image('ball', 'assets/img/ball.png');
	game.load.image('goal', 'assets/img/goal.png');

	game.load.audio('music', 'assets/aud/Pamgaea.mp3');
	game.load.audio('blip1', 'assets/aud/pong_blip_a4.wav');
	game.load.audio('blip2', 'assets/aud/pong_blip_c4.wav');
    },

    create: function () {
	game.state.start('Menu');
    }
};
