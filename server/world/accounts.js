import alt from 'alt-server';
import sha1 from 'sha1';
import {connection} from "../mysql/mysql";
alt.onClient('character:Edit', handleCharacterEdit);
const users = {
  login: "",
  admin: 0
} // создаем обьект, куда сохраняем логин
export {users}
alt.on('character:Sync', handleCharacterSync);
alt.onClient("auth_ver", (player, args) => {
player.name = args.login;
users.login = args.login;
})
/*alt.Database.Main.query("SELECT admin FROM users WHERE login = ?", [users.login], (err,res) => {
if(err){
  console.log(err)
}
else {
  users.admin = res[0]
  console.log(res[0])
}
}); */


function handleCharacterEdit(player, oldData = null) {
    if (!player || !player.valid) {
        return;
    }

    alt.emitClient(player, 'character:Edit', oldData);
}

function handleCharacterSync(player, data) {
    if (!player || !player.valid) {
        return;                                                      
    }
   
    alt.emitClient(player, 'character:Sync', data);
}
function handleDone(player, newData) {
  alt.emit('character:Done', player, newData);
  connection.query("UPDATE users SET custumatizion = ? WHERE login = ?",[JSON.stringify(newData), users.login], (err) => { 
 if(err)
 {
   console.log(err);
 }                                                                                        
  });
}

   // Авторизация/регистрация cef

  alt.onClient("reg", (player, args) => {
  //  if (args.login == "" || args.pass == "" || args.repass == "") return alt.emitClient("ErrorRegister");
    console.log("ok")
  
    connection.query ("SELECT * FROM users WHERE login = ?",[args.login], (err, result) => {
      if(err)
      {
        console.log(err)
      }
      if (result.length == 0) {
        connection.query ("INSERT INTO users(login,password,health,armour,admin,money,hash,socialclub,skin,regIP,lastIP,lastData,regData,lvl,fraction,rank) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?)",[args.login,sha1(args.pass),player.hp,0,0,0,player.hwidHash,player.socialId,0,player.ip.replace(/^.*:/, '').trim(),player.ip.replace(/^.*:/, '').trim(),0,0,0],(err) => {
          if(err) {
            console.log(err);
          }
          else {
            alt.emitClient(player, 'notifications:show', 'Вы успешно зарегистрированы. Теперь можете авторизоваться!', false, 134);
          }
        })
      }
      else {
        alt.emitClient(player, 'notifications:show', 'Пользователь с таким ником уже существует!', false, 134);
      }

    })
  }
  );

  alt.onClient("auth", (player, args) => {
    console.log(args)
    connection.query("SELECT admin FROM users WHERE login = ?", [args.login], (err,res) => {
      if(err) {
          console.log(err)
      }
      else {
     users.admin = res[0].admin;
     console.log (res[0].admin);
     connection.query("SELECT login,password FROM users WHERE login = ? AND password = ?",[args.login,sha1(args.pass)],(err,results) => {
      if(err)
      {
        console.log(err);
      }
      if (results.length == 0) {
        chat.send (player, "Неправильный ник или пароль!")
      } 
      else {
        connection.query("SELECT custumatizion FROM users WHERE login = ?",[args.login],(err,results) => {
          if(err) {
            console.log(err)
          }
      
          console.log(results[0].custumatizion)
          if(results[0].custumatizion == undefined) {
            alt.emitClient(player, 'UserSpawnStop');
            alt.emitClient(player, 'character:Edit', handleCharacterEdit);
            alt.onClient('character:Done', handleDone);
            alt.emitClient(player,'SelectMode')
          }
          else {
          
            alt.emit('character:Sync', player, JSON.parse(results[0].custumatizion));
            alt.emitClient(player, 'UserSpawnStop');
            alt.emitClient(player,'SelectMode')
          }
        })
      }
    })
  }
  })
  })