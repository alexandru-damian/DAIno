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

var currentScore = 0;

function load_player()
{
    playerWidth = 30;
    playerHeight = 50;

    playerX = 30;
    playerY = GROUND_LEVEL_Y;
}

function load_data()
{
    load_player();
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
f(x)= 0.25x + 4.75
This was precalculated for less computing power.
*/
    return ((0.25 * velocity) + 4.75);
}

function render_score()
{
    ctx.font = "26px Arial";
    ctx.fillText("Score:"+currentScore.toString(), 550,30)
}

function update_score()
{
    currentScore ++;
}

function update_next_frames()
{
    let enemyDelayFramesCoeff = calculate_delay_coeff(enemyVel);
    let enemyMultiplierSpaceCoeff = 2;

    if(enemyVel < 0)
        {
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
    if((playerY < enemy.y && playerY - playerHeight < enemy.y) ||(playerY > enemy.y + enemy.height && playerY - playerHeight > enemy.y + enemy.height))
        return false;
    if((playerX < enemy.x && playerX + playerWidth < enemy.x) ||(playerX> enemy.x + enemy.width && playerX + playerWidth > enemy.x + enemy.width))
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
        location.reload();
        
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

function render_ground()
{
    ctx.moveTo(0,GROUND_LEVEL_Y);

    ctx.lineTo(canv.width,GROUND_LEVEL_Y);
    ctx.stroke();
}

function render()
{
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillRect(playerX, playerY- playerHeight, playerWidth, playerHeight);

    render_score();
    Enemy.render_enemies();
    render_ground();
}

function gameloop()
{
    update();
    render();

    window.requestAnimationFrame(gameloop);
}

function key_listener(ev)
{
    var keyState = (ev.type == 'keydown')?true:false

    switch(ev.keyCode)
    {
        case 38:
        {
            jumpPressed = keyState;
            break;
        }
    }
}

function mouse_down()
{
    jumpPressed = true
}

function mouse_up()
{
    jumpPressed = false
}

function generate_scene()
{
    build_config();
    load_data();

    window.addEventListener("keydown", key_listener);
    window.addEventListener("keyup", key_listener);

    window.requestAnimationFrame(gameloop);
}


