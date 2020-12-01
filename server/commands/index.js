import alt from 'alt';
import chat from '../world/chat';
import {users} from "../world/accounts";
chat.registerCmd("a", (player, args) => {
if(users.admin == 0){
 chat.send(player, "Вы не можете использовать данную команду!")
}
else {

if (args[0] == undefined) 
{chat.send(player,"Введите сообщение")}
else{
alt.emitClient(player, 'adminchatmessage',"[Admin Chat] " + "[" + player.id + "] " + users.login, args[0].replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
console.log(args[0])
}
/*alt.onClient("adminchatmessage", (player, msg) => {
    if (msg.length > 0 && users.login != "") {
        alt.log('[chat:msg] ' + users.login + ': ' + msg);
  
        alt.emitClient(player, 'adminchatmessage',"[" + player.id + "] " + users.login, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
      }
      else {
        alt.emitClient(player, 'notifications:show', 'Вы не можете писать в чат, пока не авторизованы!', false, 150);
      }
}) */
}
})
