var canv,ctx;
var enemyVel = -10;

var jumpPressed = false;

var MAX_COEFF_DELAY_ENEMY_FRAMES = 3;
var MIN_COEFF_DELAY_ENEMY_FRAMES = 1;

var GROUND_LEVEL_X = 0;
var GROUND_LEVEL_Y = 280;

var minNextEnemyFrames = 0;
var maxNextEnemyFrames = 0;

var nextEnemyFrames = 0;

var highScore = 0;
var currentScore;

var remainingTime = 0;
var lastTime;

var FPS = 60
var INTERVAL = 1000/FPS

let player;
let running;

function load_player()
{
    let playerWidth = 30;
    let playerHeight = 50;

    let playerX = 30;
    let playerY = GROUND_LEVEL_Y;

    player = new Player(playerX, playerY, playerWidth, playerHeight);

    currentScore = 0;
    enemyVel = Enemy.MAX_VELOCITY

    checkpointReached = true;
}

function update_highscore()
{
    if(highScore < currentScore)
        highScore = currentScore
}

function render_highscore()
{
    ctx.clearRect(550, 30, canv.width, 60);
    ctx.font = "26px Arial";
    ctx.fillText("High:"+Math.floor(highScore).toString(), 550,60)
}

function reset_data()
{
    update_highscore();
    render_highscore();

    load_player();
    if(Enemy.enemies.length > 0)
        Enemy.enemies = []

    set_seed(0);
}

function build_config()
{
    canv = document.getElementById("game");
    ctx = canv.getContext("2d");

    running = true;
}

function calculate_delay_coeff(velocity)
{
/*
Based the on the enemy bounderies velocity and the coefficient delay bounderies we get the following function
f(x)= 0.2x + 4.4
This was precalculated for less computing power.
*/
    return ((0.2 * velocity) + 4.4);
}

function render_score()
{
    ctx.clearRect(550, 0, canv.width, 30);
    ctx.font = "26px Arial";
    ctx.fillText("Score:"+Math.floor(currentScore).toString(), 550,30)
}

function update_score()
{
    currentScore ++;
}

function update_next_frames()
{

        if(enemyVel > Enemy.MIN_VELOCITY)
        {
            let enemyDelayFramesCoeff = calculate_delay_coeff(enemyVel);
            let enemyMultiplierSpaceCoeff = 2;

            minNextEnemyFrames = Math.floor(((canv.width - player.x - player.width - Enemy.MAX_WIDTH)/(-enemyVel))/enemyDelayFramesCoeff);
            maxNextEnemyFrames = enemyMultiplierSpaceCoeff * minNextEnemyFrames;
        }
}

function end_game()
{
    running = false;
    document.getElementById('start').disabled = false;
}

function collide()
{
    if(player.y > GROUND_LEVEL_Y)
        player.stay_on_ground(GROUND_LEVEL_Y)
    
    let enemy = Enemy.enemies[0];
    
    if(Enemy.enemies.length > 0 && player.hit(enemy))
        end_game()
}

function update()
{
    update_score();
    update_next_frames();
    player.update();
    if(!nextEnemyFrames)
    {
        Enemy.add_enemy();
        nextEnemyFrames = random(minNextEnemyFrames ,maxNextEnemyFrames)
    }
    else
    {
        nextEnemyFrames --;
    }

    Enemy.update_enemies();
    collide();
}

function render()
{
    ctx.clearRect(0, 90, canv.width, canv.height);
    player.render()

    render_score();
    Enemy.render_enemies();
}

function gameloop()
{
    currentTime = Date.now();
    delta = currentTime - lastTime;
    
    remainingTime +=delta;
    
    console.log('FPS:',(1000/delta).toFixed(0));
    
    if(remainingTime > INTERVAL)
    {
        update();
        remainingTime = remainingTime - INTERVAL;
    }
    
    render();
    lastTime = currentTime

    if(running)
    window.requestAnimationFrame(gameloop);
}

function controller_listener(ev)
{
    jumpPressed = (ev.type == 'keydown' || ev.type == 'mousedown')?true:false
}

function start_game()
{
    document.getElementById('start').disabled = true

    build_config();
    reset_data();

    window.addEventListener("keydown", controller_listener);
    window.addEventListener("keyup", controller_listener);
    
    window.addEventListener("mousedown",controller_listener);
    window.addEventListener("mouseup",controller_listener);
    
    window.addEventListener("touchstart",controller_listener);
    window.addEventListener("touchend",controller_listener)

    lastTime = Date.now();
    window.requestAnimationFrame(gameloop);
}


