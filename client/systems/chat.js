import alt from 'alt';
import game from 'natives';

let buffer = [];

let loaded = false;
let opened = false;
let hidden = false;

let view = new alt.WebView("http://resource/client/cef/chat/index.html");

function addMessage(name, text) {
  if (name) {
    view.emit('addMessage', name, text);
  } else {
    view.emit('addString', text);
  }
}
function addadminmessage(name, text) {
  if (name) {
    view.emit("addadminMessage", name, text)
  }
  else {
    view.emit("addString", text)
  }
}
view.on('chatloaded', () => {
  for (const msg of buffer) {
    addMessage(msg.name, msg.text);
  }

  loaded = true;
})

view.on('chatmessage', (text) => {
  alt.emitServer('chatmessage', text);
  opened = false;
  alt.toggleGameControls(true);
})
view.on ("adminchatmessage",(text) => {
  alt.emitServer('adminchatmessage', text);
  opened = false;
  alt.toggleGameControls(true);
}) 

export function pushMessage(name, text) {
  if (!loaded) {
    buffer.push({ name, text });
  } else {
    addMessage(name, text);
  }
}

export function pushLine(text) {
  pushMessage(null, text);
}

alt.onServer('chatmessage', pushMessage);
alt.onServer("adminchatmessage", pushadminmessage)
function pushadminmessage(name, text) {
  if(!loaded) {
    buffer.push({name, text})
  }
  else {
    addadminmessage(name, text);
  }
}
alt.on('keyup', (key) => {
  if (!loaded)
    return;

  if (!opened && key === 0x73 && alt.gameControlsEnabled()) {
    opened = true;
    view.emit('openChat', false);
    alt.toggleGameControls(false);
  }
  else if (!opened && key === 0xBF && alt.gameControlsEnabled()) {
    opened = true;
    view.emit('openChat', true);
    alt.toggleGameControls(false);
  }
  else if (opened && key == 0x1B) {
    opened = false;
    view.emit('closeChat');
    alt.toggleGameControls(true);
  }

  if (key == 0x76) {
    hidden = !hidden;
    game.displayHud(!hidden);
    game.displayRadar(!hidden);
    view.emit('hideChat', hidden);
  }
})

export default { pushMessage, pushLine };
