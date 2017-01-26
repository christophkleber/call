/**
 * loadPref- Loads preference set from location, parses to JSON and then triggers adaptToUser
 *
 * @param  {int} prefSet  number of preference set (id of certain user)
 */
function loadPref (prefSet) {
    var xhttpreq;
    try{
        //modern Browser
        xhttpreq = new XMLHttpRequest();
    }catch (e){
        //Internet Explorer 5+
        try{
            xhttpreq = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
            //Internet Explorer 5
            try{
                xhttpreq = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                //not supported
                alert('XMLHTTP not supported, preference set can not be loaded');
                return false;
            }
        }
    }
    xhttpreq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(xhttpreq.responseText);
            adaptToUser(jsonObj);

        }
    };
    var url = 'https://raw.githubusercontent.com/christophkleber/data/master/' + prefSet;
    xhttpreq.open("GET", url, true);
    xhttpreq.send();
}

/**
 * adaptToUser- Queries all adaptive elements, sets their new attributes and triggers their adaptive function
 *
 * @param  {JSON} jsonObj  JSON Object of new attributes
 */
function adaptToUser(jsonObj) {
    var adaptiveElements = document.querySelectorAll('.adaptive-polymer-element');
    for (var i = 0; i < adaptiveElements.length; i++) {
        for (var prop in jsonObj[0]) {
            adaptiveElements[i].setAttribute(prop, jsonObj[0][prop]);
        }
        adaptiveElements[i].adaptive();
    }
}