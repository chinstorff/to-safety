Game.Play = function (game) { };

Game.Play.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	cursors = game.input.keyboard.createCursorKeys();

	death = game.add.sprite(-game.world.width, game.world.height + 100, 'rectangle');
	death.scale.setTo(game.world.width * 3 / 10, 5);
	game.physics.arcade.enable(death);

	goals = game.add.group();
	goals.enableBody = true;
	var goal = goals.create(0, game.world.height / 2, 'goal');
	goal.scale.setTo(game.world.width / 5, game.world.height / ( 3 / 2 * 50));
	goal = goals.create(game.world.width / 5 * 4, game.world.height / 2, 'goal');
	goal.scale.setTo(game.world.width / 5, game.world.height / ( 3 / 2 * 50));

	bounds = game.add.group();
	bounds.enableBody = true;
	var bound = bounds.create(0, -game.world.height, 'rectangle');
	bound.scale.setTo(1, game.world.width / 5);
	bound.body.immovable = true;
	bound = bounds.create(game.world.width - 10, -game.world.height, 'rectangle');
	bound.scale.setTo(1, game.world.width / 5);
	bound.body.immovable = true;
	bound = bounds.create(0, game.world.height - 10, 'rectangle');
	bound.scale.setTo(game.world.width / 50, 1);
	bound.body.immovable = true;
	bound = bounds.create(game.world.width / 5 * 4, game.world.height - 10, 'rectangle');
	bound.scale.setTo(game.world.width / 50, 1);
	bound.body.immovable = true;
	bound = bounds.create(game.world.width / 5, game.world.height / 4, 'rectangle');
	bound.scale.setTo(1, game.world.width / 10);
	bound.body.immovable = true;
	bound = bounds.create(game.world.width / 5 * 4, game.world.height / 4, 'rectangle');
	bound.scale.setTo(1, game.world.width / 10);
	bound.body.immovable = true;

	paddle = game.add.sprite(game.world.width / 4, game.world.height - 40, 'rectangle');
	paddle.scale.setTo(16, 1.5);
	game.physics.arcade.enable(paddle);

	ball = game.add.sprite(game.world.width / 5 * 3, game.world.height + 40, 'ball');
	ball.scale.setTo(0.5, 0.5);
	ball.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(ball);
	ball.body.bounce.x = 1;
	ball.body.bounce.y = 1.05;
	ball.body.gravity.y = 1000;
	ball.body.velocity.x = -300 + Math.random() * 50;
	ball.body.velocity.y = -600;

	blip1 = game.add.sound('blip1');
	blip2 = game.add.sound('blip2');
    },

    update: function () {
	paddle.body.immovable = true;
	game.physics.arcade.collide(ball, paddle, this.paddleBounce, null, this);
	paddle.body.immovable = false;
	game.physics.arcade.collide(ball, bounds, this.boundBounce, null, this);
	game.physics.arcade.collide(paddle, bounds);
	game.physics.arcade.overlap(ball, goals, this.gameWin, null, this);
	game.physics.arcade.overlap(ball, death, this.gameLose, null, this);

	paddle.body.velocity.x = 0;
	if (cursors.left.isDown) {
	    paddle.body.velocity.x = -800;
	}
	else if (cursors.right.isDown) {
	    paddle.body.velocity.x = 800;
	}

	switch (currentGameState) {
	case GameState.Won:
	    ball.body.velocity.y = (game.world.height - ball.body.position.y) / 2;
	    if (cursors.up.isDown) {
		currentGameState = GameState.InProgress;
		game.state.start('Play');
	    }
	case GameState.Lost:
	    if (cursors.up.isDown) {
		currentGameState = GameState.InProgress;
		game.state.start('Play');
	    }
	}
    },

    paddleBounce: function (ball, paddle) {
	blip1.play('', 0, 0.3, false, true);
    },

    boundBounce: function (ball, bound) {
	var variance = 0.25;
	ball.body.bounce.x = Math.random() * variance * 2 + (1 - variance);
	
	if (currentGameState != GameState.Won) {
	    blip2.play('', 0, 0.3, false, true);
	}

    },

    gameWin: function (ball, goal) {
	currentGameState = GameState.Won;
	ball.body.bounce.y = 0;
	ball.body.velocity.x = 0;
	ball.body.gravity.y = 0;

	var title = game.add.text(game.world.width / 2, game.world.height / 2, 'You won!', { font: '60px Arial', fill: '#222222', align: 'center' });
	title.anchor.setTo(0.5, 0.5);

	var prompt = game.add.text(game.world.width / 2, game.world.height / 3 * 2, 'press the UP arrow key to restart', { font: '30px Arial', fill: '#222222', align: 'center' });
	prompt.anchor.setTo(0.5, 0.5);
    },

    gameLose: function (ball, death) {
	currentGameState = GameState.Lost;

	var title = game.add.text(game.world.width / 2, game.world.height / 2, 'You lost!', { font: '60px Arial', fill: '#222222', align: 'center' });
	title.anchor.setTo(0.5, 0.5);

	var prompt = game.add.text(game.world.width / 2, game.world.height / 3 * 2, 'press the UP arrow key to restart', { font: '30px Arial', fill: '#222222', align: 'center' });
	prompt.anchor.setTo(0.5, 0.5);
    }
};
