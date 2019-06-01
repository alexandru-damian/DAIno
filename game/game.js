var lastRender = 0;
var canv,ctx;

var player_x = 0;
var player_y = 0;

var player_height = 0;
var player_width = 0;

var jump_force = 0;
var JUMP_THRESHOLD = 40;

function load_player()
{
    player_width = 30;
    player_height = 50;

    player_x = 30;
    player_y = 200;

    jump_force = 5;
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
    console.log(progress);
}

function render()
{
    ctx.fillRect(player_x, player_y, player_width, player_height);
}

function gameloop(timestamp)
{
    var progress = timestamp - lastRender;

    update(progress);
    render();

    lastRender = timestamp;

    window.requestAnimationFrame(gameloop)
}

function generate_scene()
{
    build_config();
    load_data();
    window.requestAnimationFrame(gameloop)
}


