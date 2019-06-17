function Cactus(x,y,width,height)
{
    this.x =x;
    this.y =y;

    this.width = width;
    this.height = height;
}

var Enemy = 
{

    MIN_WIDTH:20,
    MAX_WIDTH:80,

    MIN_HEIGHT:30,
    MAX_HEIGHT:50,

    MAX_VELOCITY:-7,
    MIN_VELOCIT:-15,

    enemies_keys:["cactus"],
    enemies:[],

    generate_enemy:function()
    {

        let height = random(this.MIN_HEIGHT,this.MAX_HEIGHT);
        return new Cactus(canv.width,GROUND_LEVEL_Y - height,random(this.MIN_WIDTH,this.MAX_WIDTH),height);
    },

    render_enemies:function ()
    {
        this.enemies.forEach( function(element) {
            ctx.fillRect(element.x, element.y, element.width, element.height);
        });
    },

    add_enemy:function()
    {
        let enemy = this.generate_enemy();
        this.enemies.push(enemy);
    },

    remove_enemy:function()
    {
        //TO DO:This might be very slow!!!
        this.enemies.shift();
    },

    update_enemies:function ()
    {
        this.enemies.forEach( function(element) {
            element.x += enemyVel;
        });

        if(this.enemies.length > 0 && this.enemies[0].x + this.enemies[0].width < 0)
            this.remove_enemy();
    }

};