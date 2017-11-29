
'use strict'
// in this file you can append custom step methods to 'I' object

let I

module.exports = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    // setFullsize: function() {
    //   // get nightmare instance
    //   console.log(this);
    //   let win = this.helpers['Nightmare'].win;
    //   console.log(this.helpers['Nightmare']);
    //   win.webContents.executeJavaScript(
    //     "new Promise(function(resolve) {" +
    //       "var body = document.querySelector('body');" +
    //       "resolve({" +
    //         "width: body.scrollWidth," +
    //         "height: body.scrollHeight" +
    //       "})" +
    //     "})", function(d) {
    //     win.setContentSize(d.width, d.height);
    //     // done()
    //   })
    // }
  })
}
