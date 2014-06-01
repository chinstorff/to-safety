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

	var title = game.add.text(game.world.width / 2, game.world.height / 2, 'To Safety', { font: '60px Arial', fill: '#222222', align: 'center' });
	title.anchor.setTo(0.5, 0.5);

	var prompt = game.add.text(game.world.width / 2, game.world.height / 5 * 4, 'press the UP arrow key to begin', { font: '30px Arial', fill: '#222222', align: 'center' });
	prompt.anchor.setTo(0.5, 0.5);

	var by = game.add.text(game.world.width / 2, game.world.height / 5 * 3 - 12, 'by Christopher Hinstorff', { font: '20px Arial', fill: '#222222', align: 'center' });
	by.anchor.setTo(0.5, 0.5);
	
	var attr1 = game.add.text(game.world.width / 2, game.world.height - 30, 'music: Pamgaea by Kevin Macleod (incomptech.com)', { font: '12px Arial', fill: '#222222', align: 'center' });
	attr1.anchor.setTo(0.5, 0.5);

	var attr2 = game.add.text(game.world.width / 2, game.world.height - 15, 'sound effects: NoiseCollector', { font: '12px Arial', fill: '#222222', align: 'center' });
	attr2.anchor.setTo(0.5, 0.5);

	var instr = game.add.text(game.world.width / 2, game.world.height / 3 * 2 + 20, 'LEFT and RIGHT arrow keys to move', { font: '25px Arial', fill: '#222222', align: 'center' });
	instr.anchor.setTo(0.5, 0.5);
    },

    update: function () {
	if (cursors.up.isDown) {
	    music = game.add.sound('music');
	    music.play('', 0, 0.5, true, false);
	    game.state.start('Play');
	}
    }
};
