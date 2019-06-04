var lastTime = 0;
var canv,ctx;

var playerX = 0;
var playerY = 0;

var playerHeight = 0;
var playerWidth = 0;

var jumpForce = 0;

var startHoldTime = 0;
var stopHoldTime = 0;

var dt = 0;

var g = 0;
var jumping = false;

var MAX_FORCE = .6;
var ONE_SECOND = 1000;

var GRAVITATIONAL_FORCE= .005;

var GROUND_LEVEL_X = 0;
var GROUND_LEVEL_Y = 220;

function load_player()
{
    playerWidth = 30;
    playerHeight = 50;

    playerX = 30;
    playerY = 100;

    jumpForce = 5;
    acc =.3;

    jumping = false;
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

function collide()
{
    if(playerY > GROUND_LEVEL_Y)
    {
        g = 0;
        playerY = GROUND_LEVEL_Y;
    }
}

function fall()
{
    g += GRAVITATIONAL_FORCE + 0.01;
    playerY += g * dt;
}

function update(progress)
{
    fall();
    collide();
}

function render()
{
    ctx.clearRect(0, 0, canv.width, canv.height);

    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function gameloop(currentTime)
{
    dt = currentTime- lastTime
    var progress = dt/ONE_SECOND;

    update(progress);
    render();

    lastTime = currentTime;

    window.requestAnimationFrame(gameloop);
}

function key_down(ev)
{
    switch (ev.keyCode)
    {
        case 38:
            {
                if(!jumping)
                {
                    jumping = true;
                }
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
            }
            break;
    }
}

function generate_scene()
{
    build_config();
    load_data();

    window.addEventListener("keydown", key_down, false);
    window.addEventListener("keyup", key_up, false);

    window.requestAnimationFrame(gameloop);
}


