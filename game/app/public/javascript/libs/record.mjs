class Action  
{  
    constructor(frame,action)  
    {  
        this.frame = frame;
        this.action = action;  
    }
}

export class Record
{

    #timestamp;
    #actions;

    constructor(timestamp)
    {
        this.#actions = [];
    }

    add_action(frame, action)
    {
        this.#actions.push(new Action(frame, action));
    }

    generate_json()
    {
        this.#timestamp = Date.now();
        const  json = {timestamp:this.#timestamp, actions:this.#actions};

        console ("JSON",JSON.stringify(json))

    }
}

