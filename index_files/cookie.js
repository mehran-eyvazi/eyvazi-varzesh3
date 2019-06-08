var Cookie = {
    // Create cookie
    set: function (name, value, seconds) {
        var expires;
        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + ";domain=.adro.co;path=/";
        //document.cookie = name + "=" + value + expires + ";path=/";
    },

    // Read cookie
    get: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    },

    // Erase cookie
    remove: function (name) {
        Cookie.set(name, "", -1);
    }
}

var name = "temporary";
var value = Cookie.get(name);
if (value == null || value == undefined)
{
    Cookie.set(name, "1", 20);
    var pid = document.getElementById("pid").value;
    var vid = document.getElementById("vid").value;
    if (vid == undefined)
        vid = "";
    var thirdparty = document.getElementById("thirdparty").value;
    var params = "pid=" + pid + "&vid=" + vid + "&thirdparty=" + thirdparty;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/Main/Match", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            if (obj.pixels != null && obj.pixels != undefined) {
                var iframes = "";
                for (var i = 0; i < obj.pixels.length; i++) {
                    iframes += "<iframe src='" + obj.pixels[i] + "' style='display: none; width: 0px; height: 0px; '></iframe>";
                }
                document.getElementById("pixels").innerHTML = iframes;
            }
            if (obj.shouldCreate == true) {
                Cookie.set(obj.cookieName, obj.cookieValue, 30*24*3600);
            }
            else if (obj.shouldRemove == true) {
                Cookie.remove(obj.cookieName);
            }
        }
    };
    xhttp.send(params);
}