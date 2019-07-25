'use strict';

class Player
{

    #y_velocity = 0;
    #Y_ACCELERATION = 15;

    #Y_GRAVITATIONAL_ACCELERATION = 1;

    #isFalling = false;

    constructor(x, y, width, height) 
    {
      this.x = x;
      this.y = y;   

      this.width = width;
      this.height = height;
    }

    _jump(jumpPressed)
    {
        //TO DO Decouple commands from game objects
        if(jumpPressed && !this.#isFalling)
        {
            this.#y_velocity -= this.#Y_ACCELERATION;
            this.#isFalling = true;
        }
    }

    _apply_gravity()
    {
        this.#y_velocity += this.#Y_GRAVITATIONAL_ACCELERATION;
    }

    _update_position()
    {
        this.y += this.#y_velocity;
    }

    hit(gameObject)
    {
        if(this.x < gameObject.x && this.x + this.width < gameObject.x)
            return false;
        
        if(this.y < gameObject.y && this.y - this.height < gameObject.y)
            return false;
        
        if(this.x> gameObject.x + gameObject.width && this.x + this.width > gameObject.x + gameObject.width)
            return false;
        
        if(this.y > gameObject.y + gameObject.height && this.y - this.height > gameObject.y + gameObject.height)
            return false;
        return true;
    }

    //TO DO Refactor
    update(jumpPressed)
    {
        if(this.#isFalling)
        {
            this._apply_gravity();
            this._update_position();
        }
        else
        {
            this._jump(jumpPressed);
        }
    }

    stay_on_ground(newY)
    {
        this.#y_velocity= 0;
        this.#isFalling = false;

        this.y = newY;
    }

    render(ctx)
    {
        ctx.fillRect(this.x, this.y- this.height, this.width, this.height);
    }

}
