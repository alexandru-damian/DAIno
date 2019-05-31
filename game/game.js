var lastRender = 0;
var canv,ctx;

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
	window.requestAnimationFrame(gameloop)
}


