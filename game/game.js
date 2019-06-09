var canv,ctx;

var playerX = 0;
var playerY = 0;

var playerHeight = 0;
var playerWidth = 0;

var playerVel= 0;
var enemyVel = -10;

var jumpPressed = false;
var falling = false;

var JUMP_ACC = 8;
var GRAVITATIONAL_ACC= 0.3;

var GROUND_LEVEL_X = 0;
var GROUND_LEVEL_Y = 280;

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

function jump()
{
    if(jumpPressed && !falling)
    {
        playerVel-= JUMP_ACC;
        falling = true;
    }
}

function collide()
{
    if(playerY > GROUND_LEVEL_Y)
    {
        playerVel= 0;
        falling = false;

        playerY = GROUND_LEVEL_Y;
    }
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
    if(falling)
    {
        apply_gravity();
        update_player();
    }else
    {
        jump();
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

function generate_scene()
{
    build_config();
    load_data();

    Enemy.add_enemy();
    Enemy.add_enemy();

    console.log(Enemy.enemies);

    window.addEventListener("keydown", key_listener);
    window.addEventListener("keyup", key_listener);

    window.requestAnimationFrame(gameloop);
}


