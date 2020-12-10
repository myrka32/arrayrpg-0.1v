import * as native from 'natives';
import Camera from './systems/Camera1.js';
import * as alt from 'alt-client';
import * as editor from './systems/editor';
import "./systems/auth.js";
import "./systems/notifications.js";
import "./systems/chat.js";
import {drawText2d, drawText3d} from "./systems/drawtext";
native.setPedDefaultComponentVariation(native.playerPedId());
var WebView = new alt.WebView("http://resource/client/cef/hud/index.html");
WebView.focus();
alt.everyTick(() => {
 const playerPos = { ...alt.Player.local.pos };
  drawText2d(" X: "+ playerPos.x + " Y: "+ playerPos.y + " Z: " + playerPos.z, 0.7, 0.84, 0.6, 4, 255, 255, 255, 255);
  drawText2d ("");
});


