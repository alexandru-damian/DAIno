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

    constructor(timestamp)
    {
        this.data = [];
    }

    add_action(frame, action)
    {
        this.data.push(new Action(frame, action));
    }
}

