'use strict'

const Actions = 
{
    JUMP : 'jump'
}

class Input
{
    #commands = new Map();

    register_command(action, command)
    {
        this.#commands.set(action, command);
    }

    get_command(action)
    {
        return this.#commands.get(action);
    }
}

export {Actions, GenericInput};

// CLASS Input
// {

//     constructor()
//     {
//         window.addEventListener("keydown", this.controller_listener.bind(this));
//         window.addEventListener("keyup", this.controller_listener.bind(this));
    
//         window.addEventListener("mousedown",this.controller_listener.bind(this));
//         window.addEventListener("mouseup",this.controller_listener.bind(this));
    
//         window.addEventListener("touchstart",this.controller_listener.bind(this));
//         window.addEventListener("touchend",this.controller_listener.bind(this));
//     }

//     controller_listener(ev)
//     {
//         game.set_jumpPressed_status((ev.type == 'keydown' || ev.type == 'mousedown')?true:false);
//     }


//}