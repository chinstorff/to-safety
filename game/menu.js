Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	cursors = game.input.keyboard.createCursorKeys();
	
	goals = game.add.group();
	goals.enableBody = true;
	var goal = goals.create(0, game.world.height / 2, 'goal');
	goal.scale.setTo(game.world.width / 5, game.world.height / ( 3 / 2 * 50));
	goal = goals.create(game.world.width / 5 * 4, game.world.height / 2, 'goal');
	goal.scale.setTo(game.world.width / 5, game.world.height / ( 3 / 2 * 50));

	var text = game.add.text(game.world.width / 2, game.world.height / 2, 'To Safety', { font: '60px Arial', fill: '#222222', align: 'center' });
	text.anchor.setTo(0.5, 0.5);
    },

    update: function () {
	if (cursors.up.isDown) {
	    game.state.start('Play');
	}
    }
}
