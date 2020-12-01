import alt from 'alt';

alt.on('playerDeath', (player) => {
    player.spawn(0, 0, 72, 0);
    player.model = 's_f_y_airhostess_01';
  
  });
  export default{}