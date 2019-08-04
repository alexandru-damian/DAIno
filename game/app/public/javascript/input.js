'use strict'

const Keys = 
{
    KEY_UP : 38,
    KEY_DOWN : 40
}

class JumpCommand
{
    execute(player, status)
    {
        player.set_jumpPressed_status(status);
    }
}

class Input
{
    #commands = new Map();

    register_command(key, command)
    {
        this.#commands.set(key, command);
    }

    get_command(key)
    {
        return this.#commands.get(key);
    }
}

class KeyboardDevice
{
    #inputHandler;
    #player;

    constructor(player)
    {
        this.#inputHandler = new Input();
        this.#player = player;

        window.addEventListener("keydown", this.controls.bind(this));
        window.addEventListener("keyup", this.controls.bind(this));

        this._map_commands();
    }

    _map_commands()
    {
        this.#inputHandler.register_command(Keys.KEY_UP,new JumpCommand());
    }

    controls(ev)
    {
        let status = (ev.type == 'keydown' || ev.type == 'mousedown')?true:false;

        this.#inputHandler.get_command(ev.keyCode).execute(this.#player,status);
    }
}

const Devices = 
{
    Keyboard : 0
}

class DeviceManager
{
    #devices = new Map();

    register_device(type,device)
    {
        this.#devices.set(device);
    }
}

export {DeviceManager, KeyboardDevice, Devices};

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