import {Player} from './player.js'
import {Renderer} from './renderer.js'
import {Enemies} from './enemy.js'

'use strict'

    let remainingTime = 0;
    let lastTime;
    
    let FPS = 60;
    let INTERVAL = 1000/FPS;

    let canv,ctx;

class Game
{
    #jumpPressed = false;
    
    #MAX_COEFF_DELAY_ENEMY_FRAMES = 3;
    #MIN_COEFF_DELAY_ENEMY_FRAMES = 1;
    
    #GROUND_LEVEL_X = 0;
    #GROUND_LEVEL_Y = 280;
    
    #minNextEnemyFrames = 0;
    #maxNextEnemyFrames = 0;
    
    #nextEnemyFrames = 0;
    
    #highScore = 0;
    #currentScore;
    
    #player;
    #Enemy;

    #running;

    load_player()
    {
        let playerWidth = 30;
        let playerHeight = 50;

        let playerX = 30;
        let playerY = this.#GROUND_LEVEL_Y;

        this.#player = new Player(playerX, playerY, playerWidth, playerHeight);

        //TO DO
        //Temp  fix
        this.#Enemy = new Enemies(this.#GROUND_LEVEL_Y);

        this.#currentScore = 0;
        this.#Enemy.x_velocity = this.#Enemy.MAX_VELOCITY

        //TO DO Check Trello
        //checkpointReached     = true;
    }

    get_running_state()
    {
        return this.#running;
    }

    set_jumpPressed_status(jumpPressed)
    {
        this.#jumpPressed = jumpPressed
    }

    update_highscore()
    {
        if(this.#highScore < this.#currentScore)
            this.#highScore = this.#currentScore
    }

    render_highscore()
    {
        ctx.clearRect(550, 30, canv.width, 60);
        ctx.font = "26px Arial";    
        ctx.fillText("High:"+Math.floor(this.#highScore).toString(), 550,60)
    }

    reset_data()
    {
        this.update_highscore();
        this.render_highscore(); 
        
        this.load_player();
        if(this.#Enemy.enemies.length > 0)
            this.#Enemy.enemies = []

        set_seed(0);
    }

    build_config()
    {
        canv = document.getElementById("game");
        ctx = canv.getContext("2d");

        Renderer.init(document.getElementById("game"),"2d");
        
        this.#running = true;
    }

    calculate_delay_coeff(velocity)
    {
    /*
    Ba  sed the on the enemy bounderies velocity and the coefficient delay bounderies we get the following f(x)= 0.2x + 4.4
    This was precalculated for less computing power.    
    */
        return ((0.2 * velocity) + 4.4);
    }

    render_score()
    {
        ctx.clearRect(550, 0, canv.width, 30);
        ctx.font = "26px Arial";    
        ctx.fillText("Score:"+Math.floor(this.#currentScore).toString(), 550,30)
    }

    update_score()
    {
        this.#currentScore ++;
    }

    update_next_frames()
    {
        
        if(this.#Enemy.x_velocity > this.#Enemy.MIN_VELOCITY)
        {
            let enemyDelayFramesCoeff = this.calculate_delay_coeff(this.#Enemy.x_velocity);
            let enemyMultiplierSpaceCoeff = 2;

            this.#minNextEnemyFrames = Math.floor(((canv.width - this.#player.x - this.#player.width - this.#Enemy.MAX_WIDTH)/(-this.#Enemy.x_velocity))/enemyDelayFramesCoeff);
            this.#maxNextEnemyFrames = enemyMultiplierSpaceCoeff * this.#minNextEnemyFrames;    
        }
    }

    end_game()
    {
        this.#running = false;
        document.getElementById('start').disabled = false;
    }

    collide()
    {   
        if(this.#player.y > this.#GROUND_LEVEL_Y)
        this.#player.stay_on_ground(this.#GROUND_LEVEL_Y)
        
        let enemy = this.#Enemy.enemies[0];
        
        if(this.#Enemy.enemies.length > 0 && this.#player.hit(enemy))
        this.end_game()
    }

    update()
    {
        this.update_score();
        this.update_next_frames();

        this.#player.update(this.#jumpPressed);
        if(!this.#nextEnemyFrames)    
        {
            this.#Enemy.add_enemy();
            this.#nextEnemyFrames = random(this.#minNextEnemyFrames ,this.#maxNextEnemyFrames)
        }
        else
        {
            this.#nextEnemyFrames --;
        }
        
            this.#Enemy.update_enemies();
            this.collide();
    }

    render()
    {
        ctx.clearRect(0, 90, canv.width, canv.height);
        this.#player.render()
        
        this.render_score();
        this.#Enemy.render_enemies();
    }

    controller_listener(ev)
    {
        game.set_jumpPressed_status((ev.type == 'keydown' || ev.type == 'mousedown')?true:false);
    }
}

let game = new Game();

function test()
    {
        let data = {name:"John", age:31, city:"Tokyo"};

        json_post(data,function(data)
        {
            console.log('TADAM');
            console.log(JSON.stringify(data));
        });

        json_get(function(data)
        {
            console.log('TGTBATU');
            console.log(JSON.stringify(data));
        });
    }

function gameloop()
    {
        let currentTime = Date.now();
        let delta = currentTime - lastTime;

        remainingTime +=delta;
        console.log('FPS:',(1000/delta).toFixed(0));
            
        if(remainingTime > INTERVAL)
        {
            game.update();
            game.remainingTime = remainingTime - INTERVAL;
        }

            game.render();
            lastTime = currentTime
        
        if(game.get_running_state())
            window.requestAnimationFrame(gameloop);
    }

function start_game()
{
    //Enable to post request
    //test()
    document.getElementById('start').disabled = true

    game.build_config();
    game.reset_data();

    window.addEventListener("keydown", game.controller_listener);
    window.addEventListener("keyup", game.controller_listener);
    
    window.addEventListener("mousedown",game.controller_listener);
    window.addEventListener("mouseup",game.controller_listener);
    
    window.addEventListener("touchstart",game.controller_listener);
    window.addEventListener("touchend",game.controller_listener);

    lastTime = Date.now();

    window.requestAnimationFrame(gameloop);
}

document.querySelector("#start").addEventListener("click",start_game);


