var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('rectangle', 'assets/rectangle.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('goal', 'assets/goal.png');
}

var paddle;
var ball;

var bounds;
var goals;
var death;

var cursors;

var GameState = { InProgress: 0, Lost: 1, Won: 2};
var currentGameState = GameState.inProgress;

var resultText;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    cursors = game.input.keyboard.createCursorKeys();

    var background = game.add.graphics(0, 0);
    background.beginFill(0xaaccff, 1);
    background.drawRect(0, 0, 800, 600);

    goals = game.add.group();
    goals.enableBody = true;
    var goal = goals.create(0, game.world.height / 2, 'goal');
    goal.scale.setTo(game.world.width / 5, game.world.height / ( 3 / 2 * 50));
    goal = goals.create(game.world.width / 5 * 4, game.world.height / 2, 'goal');
    goal.scale.setTo(game.world.width / 5, game.world.height / ( 3 / 2 * 50));

    death = game.add.sprite(-game.world.width, game.world.height + 60, 'rectangle');
    death.scale.setTo(game.world.width * 3 / 10, 5);
    game.physics.arcade.enable(death);

    bounds = game.add.group();
    bounds.enableBody = true;
    var bound = bounds.create(game.world.width / 5, game.world.height / 4, 'rectangle');
    bound.scale.setTo(1, game.world.width / 10);
    bound.body.immovable = true;
    bound = bounds.create(game.world.width / 5 * 4, game.world.height / 4, 'rectangle');
    bound.scale.setTo(1, game.world.width / 10);
    bound.body.immovable = true;
    bound = bounds.create(0, -game.world.height, 'rectangle');
    bound.scale.setTo(1, game.world.width / 5);
    bound.body.immovable = true;
    bound = bounds.create(game.world.width - 10, -game.world.height, 'rectangle');
    bound.scale.setTo(1, game.world.width / 5);
    bound.body.immovable = true;
    bound = bounds.create(0, game.world.height - 10, 'rectangle');
    bound.scale.setTo(game.world.width / 50, 1);
    bound.body.immovable = true
    bound = bounds.create(game.world.width / 5 * 4, game.world.height - 10, 'rectangle');
    bound.scale.setTo(game.world.width / 50, 1);
    bound.body.immovable = true

    paddle = game.add.sprite(game.world.width / 4, game.world.height - 40, 'rectangle');
    paddle.scale.setTo(16, 1.5);
    game.physics.arcade.enable(paddle);

    ball = game.add.sprite(game.world.width / 5 * 3, game.world.height + 40, 'ball');
    ball.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(ball);
    ball.body.bounce.x = 1;
    ball.body.bounce.y = 1.05;
    ball.body.gravity.y = 1000;
    ball.body.velocity.x = -300 + Math.random() * 50;
    ball.body.velocity.y = -600;
}

function update() { 
    paddle.body.immovable = true;
    game.physics.arcade.collide(ball, paddle);
    paddle.body.immovable = false;
    game.physics.arcade.collide(ball, bounds, boundBounce, null, this);
    game.physics.arcade.collide(paddle, bounds);
    game.physics.arcade.overlap(ball, goals, gameWin, null, this);
    game.physics.arcade.overlap(ball, death, gameLose, null, this);

    paddle.body.velocity.x = 0;
    if (cursors.left.isDown) {
	paddle.body.velocity.x = -800;
    }
    else if (cursors.right.isDown) {
	paddle.body.velocity.x = 800;
    }

    switch (currentGameState) {
    case GameState.Won:
	ball.body.velocity.y = (game.world.height - ball.body.position.y) / 2 ;
    }
}

function boundBounce(ball, bound) {
    var variance = 0.25;
    ball.body.bounce.x = Math.random() * variance * 2 + (1 - variance);
}

function gameWin(ball, goal) {
    currentGameState = GameState.Won;
    ball.body.bounce.y = 0;
    ball.body.velocity.x = 0;
    ball.body.gravity.y = 0;

    resultText = game.add.text(335, 300, 'You won!', {fill: '#222'});
}

function gameLose(ball, death) {
    resultText = game.add.text(335, 300, 'You lost!', {fill: '#222'});
}

function endGame(won) {


    // display message
    // offer restart
}
