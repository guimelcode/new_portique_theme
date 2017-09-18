//export let isMobile = false;
import {Store} from '../states'

export function whichTransitionEvent() {
  let t,
  el = document.createElement("fakeelement");

  let transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

export function WidthChange(mq) {
  if (mq.matches) {
    // window width is at least 992px
    console.log( "window width is at least 992px");
    //isMobile = false;
    // console.log('mq.matches : '+ isMobile);
    // Menu();
    Store.dispatch({type:'CHANGE_MOBILE', isMobile: false})
    

  } else {
    // window width is less than 992px
    console.log( "window width is less 992px");
    Store.dispatch({type:'CHANGE_MOBILE', isMobile: true})
    //isMobile = true;
    // console.log('mq.matches : '+ isMobile);
    // MenuMobile();
  }
}




export function OrientationHandler(orientation){
  //console.log(orientation.matches);
  if(orientation.matches){
    $('.site').addClass('landscape');
  }else {
    if($('.site').hasClass('landscape')){$('.site').removeClass('landscape')};

  }
}
