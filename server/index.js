import alt from "alt";
import './events/PlayerConnect.js';
import './commands/index.js';
import mysql from './mysql/mysql.js';
import PlayerConnect from "./events/PlayerConnect.js";
import './world/accounts.js';
import "./world/chat.js"
import "./scripts/selection.js"

function getWeatherType(key)
{
    let weather;
    switch(key){
        case 'Drizzle'      : weather = 'Drizzle';
        break;
        case 'Clear'        : weather = 'Clear';
        break;
        case 'Clouds'       : weather = 'Clouds';
        break;
        case 'Rain'         : weather = 'Rain';
        break;
        case 'Thunderstorm' : weather = 'Thunderstorm';
        break;
        case 'Thunder'      : weather = 'Thunder';
        break;
        case 'Foggy'        : weather = 'Foggy';
        break;
        case 'Fog'          : weather = 'Fog';
        break;
        case 'Mist'         : weather = 'Mist';
        break;
        case 'Smoke'        : weather = 'Smoke';
        break;
        case 'Smog'         : weather = 'Smog';
        break;
        case 'Overcast'     : weather = 'Overcast';
        break;
        case 'Snowing'      : weather = 'Snowing';
        break;
        case 'Snow'         : weather = 'Snow';
        break;
        case 'Blizzard'     : weather = 'Blizzard';
        break;
        default        : weather = 'Clear';
    } 
    console.log(weather)
    return {weather};
}


