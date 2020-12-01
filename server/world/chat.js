import alt from 'alt';
 const users = {
  login: "",
  admin: 0
}

alt.onClient("auth_сhat", (player, args) => {
users.login = args.login;
})

let cmdHandlers = {};

function invokeCmd(player, cmd, args) {
  const callback = cmdHandlers[cmd];

  if (callback) {
    callback(player, args);
  } else {
    send(player, `{FF0000} Unknown command /${cmd}`);
  }
}

alt.onClient('chatmessage', (player, msg) => {
  if (msg[0] === '/') {
    msg = msg.trim().slice(1);

    if (msg.length > 0) {
      alt.log('[chat:cmd] ' + player.id + users.login + ': /' + msg);

      let args = msg.split(' ');
      let cmd = args.shift();

      invokeCmd(player, cmd, args);
    }
  } else {
    msg = msg.trim();

    if (msg.length > 0 && users.login != "") {
      alt.log('[chat:msg] ' + users.login + ': ' + msg);

      alt.emitClient(player, 'chatmessage',"[" + player.id + "] " + users.login, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
    }
    else {
      alt.emitClient(player, 'notifications:show', 'Вы не можете писать в чат, пока не авторизованы!', false, 150);
    }
  }
});

export function send(player, msg) {
  alt.emitClient(player, 'chatmessage', null, msg);
}

export function broadcast(msg) {
  send(null, msg);
}

export function registerCmd(cmd, callback) {
  if (cmdHandlers[cmd] !== undefined) {
    alt.logError(`Failed to register command /${cmd}, already registered`);
  } else {
    cmdHandlers[cmd] = callback;
  }
}

export default { send, broadcast, registerCmd };
