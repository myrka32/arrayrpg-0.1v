import alt from "alt";
import camera from "./Camera1.js";
import * as native from 'natives';
import * as notifications from './notifications.js';
const WebView = new alt.WebView("http://resource/client/cef/auth/index.html");
alt.onServer('UserSpawnStart', () => {
    const skinChooserCam = new camera(
      {x: -25.068, y: 491.116, z: 522.6594},
      {x: -8.46060848236084, y: 0, z: -58.01802062988281},
      50
  )
skinChooserCam.render()
WebView.focus();
alt.showCursor(true);
WebView.on ("register", (args) => {
    alt.log(args)
    alt.emitServer("reg", args);

})
WebView.on("authorization", (args) => {
    alt.log (args)
    alt.emitServer("auth", args)
    alt.emitServer("auth_ver", args)
    alt.emitServer("auth_сhat", args)
})
native.displayHud(true);
native.displayRadar(false);
native.freezeEntityPosition(alt.Player.local.scriptID,true);
  });

  alt.onServer('UserSpawnStop', () => {
    const skinChooserCam = new camera(
      {x: -25.068, y: 491.116, z: 522.6594},
      {x: -8.46060848236084, y: 0, z: -58.01802062988281},
      50
  )
    skinChooserCam.unrender();
    native.displayHud(true);
    native.displayRadar(false);
    alt.showCursor(false);
    WebView.destroy();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
  //  notifications.show('Вы успешно зарегистрированы!', false, 134);
  //  notifications.show('Пользователь с таким ником уже существует!', false, 135);
  });
