var canv,ctx;

var playerX = 0;
var playerY = 0;

var playerHeight = 0;
var playerWidth = 0;

var playerVel= 0;

var jumpPressed = false;
var falling = false;


var JUMP_ACC = 8;
var GRAVITATIONAL_ACC= 0.3;

var GROUND_LEVEL_X = 0;
var GROUND_LEVEL_Y = 220;

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
        falling = false
        playerY = GROUND_LEVEL_Y
    }
}

function apply_gravity()
{
    playerVel+= GRAVITATIONAL_ACC;
    playerY += playerVel;
}

function update()
{
    if(falling)
    {
    apply_gravity();
    }

    jump();
    collide();
}

function render()
{
    ctx.clearRect(0, 0, canv.width, canv.height);

    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillRect(0,GROUND_LEVEL_Y+playerHeight,canv.width,1)

}

function gameloop()
{

    update();
    render();

    window.requestAnimationFrame(gameloop);
}

function key_down(ev)
{
    switch (ev.keyCode)
    {
        case 38:
            {
                    jumpPressed = true;
            }
            break;
    }
}

function key_up(ev)
{
    switch (ev.keyCode)
    {
        case 38:
            {
                jumpPressed = false;
            }
            break;
    }
}

function generate_scene()
{
    build_config();
    load_data();

    window.addEventListener("keydown", key_down);
    window.addEventListener("keyup", key_up);

    window.requestAnimationFrame(gameloop);
}


