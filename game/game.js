var lastRender = 0;
var canv,ctx;

var player_x = 0;
var player_y = 0;

function load_default_assests()
{
	player_x = 30;
	player_y = 200;
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
	ctx.fillRect(player_x, player_y, 30, 50);
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
	load_default_assests();
	window.requestAnimationFrame(gameloop)
}


