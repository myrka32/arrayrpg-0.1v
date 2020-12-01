import alt from 'alt';

alt.on('playerConnect', (player) => {
    player.spawn (402.5164,-1002.847,-99.2587); // спавним изначально человека тут.
    player.auth = {};
    player.model = 'mp_m_freemode_01'; // лысый мужик
    player.admin = 0;
    player.hp = 100;
    
   // player.setWeather(13);
    alt.emitClient(player, 'UserSpawnStart');
  });
  export default{}
  