var canv,ctx;

var playerX = 0;
var playerY = 0;

var playerHeight = 0;
var playerWidth = 0;

var playerVel= 0;
var enemyVel = -10;

var jumpPressed = false;
var falling = false;

var MAX_COEFF_DELAY_ENEMY_FRAMES = 3;
var MIN_COEFF_DELAY_ENEMY_FRAMES = 1;

var JUMP_ACC = 15;
var GRAVITATIONAL_ACC= 1;

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

function load_player()
{
    playerWidth = 30;
    playerHeight = 50;

    playerX = 30;
    playerY = GROUND_LEVEL_Y;

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

            minNextEnemyFrames = Math.floor(((canv.width - playerX - playerWidth - Enemy.MAX_WIDTH)/(-enemyVel))/enemyDelayFramesCoeff);
            maxNextEnemyFrames = enemyMultiplierSpaceCoeff * minNextEnemyFrames;
        }
}

function jump()
{
    if(jumpPressed && !falling)
    {
        playerVel-= JUMP_ACC;
        falling = true;
    }
}

function has_collided(enemy)
{
    if(playerX < enemy.x && playerX + playerWidth < enemy.x)
        return false;
    
    if(playerY < enemy.y && playerY - playerHeight < enemy.y)
        return false;
    
    if(playerX> enemy.x + enemy.width && playerX + playerWidth > enemy.x + enemy.width)
        return false;
    
    if(playerY > enemy.y + enemy.height && playerY - playerHeight > enemy.y + enemy.height)
        return false;
    return true;
}

function collide()
{
    if(playerY > GROUND_LEVEL_Y)
    {
        playerVel= 0;
        falling = false;

        playerY = GROUND_LEVEL_Y;
    }
    
    let enemy = Enemy.enemies[0];
    
    if(Enemy.enemies.length > 0 && has_collided(enemy))
        reset_data();
        
}

function apply_gravity()
{
    playerVel+= GRAVITATIONAL_ACC;
}

function update_player()
{
    playerY += playerVel;
}

function update()
{
    update_score();
    update_next_frames();
    if(falling)
    {
        apply_gravity();
        update_player();
    }else
    {
        jump();
    }
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
    ctx.fillRect(playerX, playerY- playerHeight, playerWidth, playerHeight);

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

    window.requestAnimationFrame(gameloop);
}

function controller_listener(ev)
{
    jumpPressed = (ev.type == 'keydown' || ev.type == 'mousedown')?true:false
}

function generate_scene()
{
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


