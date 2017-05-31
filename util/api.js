var path = require('path');
var fs = require('fs');

var location = path.join(__dirname, '../build/style-min.css');

module.exports = {
    location: location,
    content: function(then) {
        if(!then)
            return new Promise(function (resolve, reject){
                _content(function(err, res) {
                    if(err)
                        return reject(err);
                    return resolve(res);
                })
            });
        else _content(then);
    }
}

function _content(then) {
    fs.readFile(location, 'utf-8', then);
}