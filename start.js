require('babel-register')({
  presets: [
    [ 'env' ,
      {
        'targets': 
          {
            "node": "current"
          }
      }
    ],
  ]
});
require("babel-core").transform("code", {
  plugins: ["syntax-object-rest-spread"]
});
module.exports = require('./index.js')