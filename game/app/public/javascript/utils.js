let seed = 0;
const MAX_NUMBER = 2147483648

function normalize(x,x_min,x_max,new_x_min,new_x_max)
{
    return ((x-x_min)*(new_x_max-new_x_min)/(x_max-x_min))+new_x_min;
}

function get_new_seed()
{
    const MULTIPLIER = 1103515245;
    const INCREMENT = 12345;
    
    seed = (seed * MULTIPLIER + INCREMENT) % MAX_NUMBER;
    return seed;
}

function set_seed(s)
{
  seed = s;
}

function rand()
{
    const MAX_INTERVAL = 0.999999999;
    const MIN_INTERVAL = 0;
    
    return normalize(get_new_seed(),MAX_NUMBER,0,MIN_INTERVAL,MAX_INTERVAL)
}

function random(min,max)
{
    return Math.floor((max - min +1)*rand())+min
}

function json_post(data, callback)
{
     $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/save-record',                      
        success: callback
    });
}

