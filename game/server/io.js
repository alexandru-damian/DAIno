let fs = require('fs');


class IO
{

    constructor ()
    {
        this.data = new Array();
    }

        _read_json(filepath)
    {
        let raw_data = fs.readFileSync(filepath)
        return JSON.parse(raw_data)
    }

    load_data(path)
    {
        let files = fs.readdirSync(path);

        files.forEach(file=>
        {
            this.data.push(this._read_json(path+file));
        });

        console.log('data',this.data[0]);
    }

}

module.exports = IO;