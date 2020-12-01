import alt from "alt";
alt.onClient("dmconnect", (player, args) => {
    console.log("ок" + args)
    player.giveWeapon(0xB1CA77B1, 2982836145, 20);
 //   player.giveWeapon(0x7F229F94, bullpuprifle, 1000);
    player.spawn(-967.633,-2998.757,13.945)
    alt.emitClient(player,'dmconnectsuc')
    alt.on("playerDeath", player => {
    player.spawn (-967.633,-2998.757,13.945);
     })
})