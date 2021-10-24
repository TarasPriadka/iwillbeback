const MOVING_AVE_WINDOW = 100;

/**
 * convert to simpler form
 * @param loc some location
 * @return [x, y]
 */
function loc_to_pt(loc) {
    // TODO
    return (loc.x, loc.y);
}

/**
 *
 * @param history Array of locations
 */
function is_anomalous(history, dest_loc) {
    let points = history.map(loc_to_pt);
    let dest = loc_to_pt(dest_loc);

    let moving_ave = movingAvg(dest, MOVING_AVE_WINDOW);
    let l = moving_ave.length;
    if (moving_ave[l - 1] > moving_ave[l - 2]) {
        // moving away
        return true;
    }
    return false;
}

/**
 * returns an array with moving average of the input array
 * @param array - the input array
 * @param count - the number of elements to include in the moving average calculation
 * @param qualifier - an optional function that will be called on each
 *  value to determine whether it should be used
 */
function movingAvg(array, count, qualifier){

    // calculate average for subarray
    var avg = function(array, qualifier){

        var sum = 0, count = 0, val;
        for (var i in array){
            val = array[i];
            if (!qualifier || qualifier(val)){
                sum += val;
                count++;
            }
        }

        return sum / count;
    };

    var result = [], val;

    // pad beginning of result with null values
    for (var i=0; i < count-1; i++)
        result.push(null);

    // calculate average for each subarray and add to result
    for (var i=0, len=array.length - count; i <= len; i++){

        val = avg(array.slice(i, i + count), qualifier);
        if (isNaN(val))
            result.push(null);
        else
            result.push(val);
    }

    return result;
}