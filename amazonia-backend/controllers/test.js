const fs = require('fs');

var read_data = fs.readFileSync('object2.json', 'utf8');

var append_data = ["http://2.file"]

data = JSON.parse(read_data).key.concat(append_data);
var write_data = {key: data};
console.log(write_data);

fs.writeFile('object.json', JSON.stringify(write_data), (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Success")
    }
})

