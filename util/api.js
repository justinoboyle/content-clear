var path = require('path');
var fs = require('fs');

var location = path.join(__dirname, '../build/style-min.css');

module.exports = {
    location: location,
    content: function(then) {
        if(!then)
            return new Promise(_content);
        else _content(then);
    }
}

function _content(then) {
    fs.readFile(location, then);
}