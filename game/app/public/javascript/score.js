'use strict'

import {Renderer} from './renderer.js'

export class Score
{
    #highScore;
    #currentScore;
    
    constructor()
    {
        this.#highScore = 0;
        this.#currentScore = 0;
    }
    
    _set_highscore()
    {
        if(this.#highScore < this.#currentScore)
            this.#highScore = this.#currentScore;
    }
    
    render()
    {
        Renderer.clear_canvas(550, 0, Renderer.get_width(), 30);
        Renderer.render_text("Score:"+Math.floor(this.#currentScore).toString(),550,30,"26px Arial");
    }
    
    _render_highscore()
    {
        Renderer.clear_canvas(550, 30, Renderer.get_width(), 60);
        Renderer.render_text("High:"+Math.floor(this.#highScore).toString(),550,60,"26px Arial");
    }
    
    update()
    {
        this.#currentScore ++;
    }
    
    reset()
    {
        this._set_highscore();
        this._render_highscore();
        
        this.#currentScore = 0;
    }
}