
$ = jQuery;

import bootstrap from "bootstrap"
import SwipperCss from 'swiper/dist/css/swiper.css'
import css from '../../css/main.css'
import {whichTransitionEvent, WidthChange, OrientationHandler} from './toolBox-ui.js';
import {MenuInit} from './menu';


export function userInterfaceStart() {

  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addListener(WidthChange);
    WidthChange(mq);


    const mql = window.matchMedia("(orientation: landscape)");
    mql.addListener(OrientationHandler);
    OrientationHandler(mql);
  }
}
