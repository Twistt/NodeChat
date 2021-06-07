"use strict";
String.prototype.contains = function (data) {
    if (this.indexOf(data) !== -1)
        return true;
    else
        return false;
};
/*

String.replaceAll = function (str1, str2) {
    var str = this;
    while (str.indexOf(str1) !== -1) {
        str = str.replace(str1, str2);
    }
    return str;
};
function contains(data) {
    if (this.indexOf(data) !== -1) return true;
    else return false;
}
Array.prototype.contains = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === value) return true;
    }
    return false;
}
Array.prototype.whereDate = function (propName, value) {
    var ar = [];
    for (var i = 0; i < this.length; i++) {
        obj = this[i];
        if (obj.hasOwnProperty(propName)) {
            var prop = new Date(obj[propName]).setHours(0, 0, 0, 0);
            var val = new Date(value).setHours(0, 0, 0, 0);
            if (prop === val) ar.push(obj);
        }
    }
    return ar;
}
Array.prototype.where = function (propName, value) {
    var ar = [];
    for (var i = 0; i < this.length; i++) {
        obj = this[i];
        if (obj.hasOwnProperty(propName)) {
            if (obj[propName] === value) ar.push(obj);
        }
    }
    return ar;
}
Array.prototype.count = function (propName, value) {
    var count = 0;
    for (var i = 0; i < this.length; i++) {
        obj = this[i];
        if (obj.hasOwnProperty(propName)) {
            if (obj[propName] === value) count++;
        }
    }
    return count;
}

Array.prototype.whereContains = function (propName, value) {
    var ar = [];
    for (var i = 0; i < this.length; i++) {
        obj = this[i];
        if (obj.hasOwnProperty(propName)) {
            if (obj[propName].toString().contains(value.toString())) ar.push(obj);
        }
    }
    return ar;
}
Array.prototype.first = function (propName, value) {
    for (var i = 0; i < this.length; i++) {
        var obj = this[i];
        if (obj.hasOwnProperty(propName)) {
            if (obj[propName] === value) return obj;
        }
    }
    return null;
}
Array.prototype.take = function (amount) {
    var returnArray = [];
    for (var i = 0; i < this.length; i++) {
        var obj = this[i];
        returnArray.push(obj);
        if (i === amount) return returnArray;
    }
    return returnArray;
}
Array.prototype.skip = function (amount) {
    var returnArray = [];
    for (var i = 0; i < this.length; i++) {
        var obj = this[i];
        if (i >= amount) returnArray.push(obj);
    }
    return returnArray;
}
Array.prototype.position = function (propName, value) {
    for (var i = 0; i < this.length; i++) {
        obj = this[i];
        if (obj.hasOwnProperty(propName)) {
            if (obj[propName] === value) return i;
        }
    }
    return null;
}

Array.prototype.clone = function () {
    return this.slice(0);
};
Array.prototype.remove = function (index) {
    return this.splice(index, 1);
};
Array.prototype.insert = function (index, item) {
    return this.splice(index, 0, item);
};

Array.prototype.last = function (amt) {
    console.log(amt);
    if (amt === undefined || amt === null) return this[this.length - 1];
    var sliceamt = (this.length - amt);
    if (sliceamt < 0) return this;
    else {
        return this.slice(sliceamt, this.length);
    }
}
Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}
Date.prototype.subtractHours = function (h) {
    this.setHours(this.getHours() - h);
    return this;
}
Date.prototype.formatMMDDYYYY = function () {
    return (this.getMonth() + 1) +
        "/" + this.getDate() +
        "/" + this.getFullYear();
}
Date.prototype.Dotnet = function () {
    var date = new Date();
    var day = date.getDay();        // yields day
    var month = date.getMonth();    // yields month
    var year = date.getFullYear();  // yields year
    var hour = date.getHours();     // yields hours
    var minute = date.getMinutes(); // yields minutes
    var second = date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    return day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;

}
String.prototype.IsValidDate = function () {
    var regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (this != null)
        return this.match(regEx) != null;
    else
        return false;
}
*/ 
