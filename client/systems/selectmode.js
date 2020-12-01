import alt from "alt";
import camera from "./Camera1";
import * as native from 'natives';
alt.onServer("SelectMode", () => {
  var WebView = new alt.WebView("http://resource/client/cef/modeselection/index.html");
 const skinChooserCam = new camera(
      {x: -1609.9807, y: -2221.4719, z: 11.994},
      {x: -8.46060848236084, y: 0, z: -58.01802062988281},
        50
    )
    skinChooserCam.render();
    WebView.focus();
    native.freezeEntityPosition(alt.Player.local.scriptID,true);

  WebView.on("DMConnect", (args) => {
    alt.emitServer("dmconnect",args);

  })
 
  alt.onServer("dmconnectsuc", () => {
    WebView.destroy();
    skinChooserCam.unrender();
    alt.showCursor(false);
    native.displayRadar(true);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
  })
})