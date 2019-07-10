let fs = require('fs');


class IO
{

    constructor ()
    {
        this.data = new Array();
        this.filePaths = new Array();
    }

    _read_json(filepath)
    {
        let raw_data = fs.readFileSync(filepath)
        return JSON.parse(raw_data)
    }

    _write_json(filePath, element)
    {
        let jsonObj =  JSON.stringify(element, null , 2);
        console.log('obj',jsonObj)
        fs.writeFileSync(filePath, jsonObj)
        
    }

    save_data()
    {
        for(let index=0; index<this.data.length; ++index)
        {
            console.log(this.data[index])
            this._write_json(this.filePaths[index],this.data[index])
        }

            
    }

    load_data(path)
    {
        let files = fs.readdirSync(path);

        files.forEach(file=>
        {
            this.data.push(this._read_json(path+file));
            this.filePaths.push(path+file);

            //--------TEMP----------
        let test ={frame: 2600, action:"jump"}
        this.data[this.filePaths.length-1].records.push(test);
            //----------------------
        });
    }

}

module.exports = IO;