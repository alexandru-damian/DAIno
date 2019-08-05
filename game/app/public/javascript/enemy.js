'use strict';

import {Renderer} from './renderer.js'

class Cactus
{
    constructor(x,y,width,height)
    {
        this.x =x;
        this.y =y;

        this.width = width;
        this.height = height;
    }
}

//TO DO 
//Temporary fix for the migration
export class Enemies
{
    MIN_WIDTH=20;
    MAX_WIDTH=80;

    MIN_HEIGHT=30;
    MAX_HEIGHT=50;

    MAX_VELOCITY=-6;
    MIN_VELOCITY=-15;
    
    x_velocity=-10;

    enemies_keys=["cactus"];
    enemies=[];
    
    constructor(ground_level_y)
    {
        this.GROUND_LEVEL_Y = ground_level_y;
    }
    
    generate_enemy()
    {

        let height = random(this.MIN_HEIGHT,this.MAX_HEIGHT);
        return new Cactus(Renderer.get_width(),this.GROUND_LEVEL_Y - height,random(this.MIN_WIDTH,this.MAX_WIDTH),height);
    }

    render_enemies()
    {
         for(let index in this.enemies)
        {
           Renderer.render(this.enemies[index].x, this.enemies[index].y, this.enemies[index].width, this.enemies[index].height);
        }
    }

    add_enemy()
    {
        let enemy = this.generate_enemy();
        this.enemies.push(enemy);
    }

    remove_enemy()
    {
        //TO DO:This might be very slow!!!
        this.enemies.shift();
    }

    update_enemies()
    {
        for(let index in this.enemies)
        {
            this.enemies[index].x += this.x_velocity;
        }

        if(this.enemies.length > 0 && this.enemies[0].x + this.enemies[0].width < 0)
            this.remove_enemy();
    }
    
}