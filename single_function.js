
/***[Function parseTime]******************************************************
 * Turns a time string [01:23:45.123] into a float value, containing the     *
 * total passed seconds as whole number, and the milliseconds as it's        *
 * decimals.                                                                 *
 ************************************************************[Serious Hare]***/
function parseTime(timeString, scaleList = [1, 60, 60, 24]){
    // Clean string:timeString (just trim atm) and create a storage variable to
    // store the result while we're parsing our string.
    var stringTime = timeString.trim();
    var resultTime = 0;
    

    /***[ Getting the milliseconds ]**********************************************
     * Get the milliseconds using a left aligned regex that includes the decimal *
     * seperator between seconds and milliseconds. This way we don't have to     *
     * devide the milliseconds by 1000 to add them as decimals. Uses 0 as the    *
     * default value when no milliseconds are present.                           *
     ************************************************************[Serious Hare]***/

    // Try to find the milliseconds using regex (including dot).
    var match = stringTime.match(/\.[0-9]+$/);
    // Add the found match as value or 0 to the result time.
    resultTime += match? +match[0] : 0;
    

    /***[ Parse the other segments ]**********************************************
     * Now we remove the milliseconds from the string and break it on the colon  *
     * seperator. Then we iterate over the array elements from the right. First  *
     * we multiply the multiplier with the next entry in the multiplierList and  *
     * then we multiply the time segment with the new multiplier. Once the array *
     * with segments is empty, we're done.                                       *
     ************************************************************[Serious Hare]***/

    // Get the rounded length of stringTime.
    var index = match? match.index : stringTime.length;
    // Round stringTime, removing the milliseconds, and then split it on ':'.
    var arrayTime = stringTime.substr(0, index).split(":");
    // Set the time segment scaler to 1.
    var timeScaler = 1;

    // While we have time segments,
    while(arrayTime.length){
        // Multiply the multiplier with the next entry of the multiplier list.
        timeScaler *= scaleList.shift();
        // Add the next segment multiplied by it's scaler to the result.
        resultTime += arrayTime.pop() * timeScaler;
    }

    // Return the result.
    return resultTime;
}
