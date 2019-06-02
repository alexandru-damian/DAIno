var lastTime = 0;
var canv,ctx;

var playerX = 0;
var playerY = 0;

var playerHeight = 0;
var playerWidth = 0;

var jumpForce = 0;

var startHoldTime = 0;
var stopHoldTime = 0;

var jumping = false;

var JUMP_THRESHOLD = 10;
var ONE_SECOND = 1000;

function load_player()
{
    playerWidth = 30;
    playerHeight = 50;

    playerX = 30;
    playerY = 200;

    jumpForce = 5;

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

function update(progress)
{
}

function render()
{
    ctx.clearRect(0, 0, canv.width, canv.height);

    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function gameloop(currentTime)
{
    var progress = (currentTime- lastTime)/ONE_SECOND;

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
                    startHoldTime = Date.now();
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
                stopHoldTime = Date.now();
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


