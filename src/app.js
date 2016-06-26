/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'aare',
  icon: 'images/menu_icon.png',
  //subtitle: 'Loading data',
  body: 'Loading data from aare.schwumm.ch \n(powered by BAFU)',
  //subtitleColor: 'indigo', 
  //bodyColor: 'indigo',
  style: 'small'
});

main.show();

var Vector2 = require('vector2');

// Make request to aare.schwumm.ch
ajax(
  {
    url:'http://aare.schwumm.ch/aare.json',
    type:'json'
  },
  function(data) {
    var temperature = data.temperature;
    var degree = Math.round(18*temperature);
    var blueRgb = Math.round(12*temperature);
    var blueHex = blueRgb.toString(16);
    if (temperature > 20) {
      degree = 360;
      blueHex = 'ff';
    }
    var color = '#0000' + blueHex;
    var wind = new UI.Window({
      backgroundColor: 'white'
    });
    var radial = new UI.Radial({
      size: new Vector2(140, 140),
      angle: 0,
      angle2: degree,
      radius: 15,
      backgroundColor: color,
      //borderColor: 'celeste',
      borderWidth: 0
    });
    var textfield = new UI.Text({
      size: new Vector2(140, 60),
      font: 'BITHAM_42_BOLD',
      text: temperature + '°',
      textAlign: 'center',
      color: color
    });
    var windSize = wind.size();
    // Center the radial in the window
    var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
    radial.position(radialPos);
    // Center the textfield in the window
    var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
    textfield.position(textfieldPos);
    wind.add(radial);
    wind.add(textfield);
    wind.show();
    main.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);


