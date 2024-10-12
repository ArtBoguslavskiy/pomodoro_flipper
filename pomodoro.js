let dialog = require('dialog');
let submenu = require('submenu');
let notify = require('notification');

let colors = {'15': 'green', '30': 'yellow', '60': 'magenta'};

function setUpSubmenu() {
  submenu.addItem('15 min', 15);
  submenu.addItem('30 min', 30);
  submenu.addItem('60 min', 60);

  submenu.setHeader('Select a duration:');
}

function getTimerColor(duration) {
  return colors[to_string(duration)];
}

function startTimer(duration) {
  print('You select', duration, 'minutes');
  let color = getTimerColor(duration);
  for (let i = 0; i < duration * 60; i++) {
    if(i && i % 60 === 0) {
      print(duration - i / 60, 'minutes left');
    }
    notify.blink(color, 'long');
    delay(1000);
  }
}

setUpSubmenu();

let dialogResult = dialog.message('Pomodoro Timer', 'Press Ok to start');

if(dialogResult) {
  let submenuResult = submenu.show();
  startTimer(submenuResult);
  notify.success();
} else {
  print(dialogResult, 'is pressed');
}