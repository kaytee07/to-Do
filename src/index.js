import "./style.css";
import DOM from "./dom";
import {checkTodaysNotifs, todayOrThisWeek} from "./controllers"
require("bootstrap-icons/font/bootstrap-icons.css");

DOM.init();

todayOrThisWeek();

setInterval(function() {
checkTodaysNotifs(); 
}, 1000); // check every second

