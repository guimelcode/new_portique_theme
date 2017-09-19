$ = jQuery;

import { whichTransitionEvent } from './toolBox-ui'
import {Store} from '../states'

// Variables
let transitionEvent, menuMainContainer, topMenu, categoryLink, rubriqueLink, lpHome, socialItem, langMenu, footerMobile;
let toggleNav = false;
let socialLangDisplacement = false;
let navState = 'category';
const baseUrl = '/portique_test_room/proj2';


export function MenuInit(){
  // Init Variables
  transitionEvent = whichTransitionEvent();
  menuMainContainer = $('.main-navigation');
  topMenu = $('#top-menu');
  categoryLink = $('#top-menu>li>a');
  rubriqueLink = $('.sub-menu>li>a');
  socialItem = $('.social-icon');
  lpHome = $('.lp-home');
  langMenu = $('.qtranxs-lang-menu-item');
  footerMobile = $('#mobile-footer');

  if(!localStorage.getItem("introPlay")){
    localStorage.setItem("introPlay", false); //what ?
  }
  console.log('MENU !!!!!!!!!!!!!!!!!!!!');

  langRedesign();
}

export function Menu(isMobile) {
  // console.log($('.lp-home'));
  //lpHome = $('.lp-home');
  lpHome.click(logoComportement);
  socialLangDisplace(isMobile);
  if(isMobile){
    modList();
    if(localStorage.getItem("introPlay") == "no"){
      console.log(localStorage.getItem("introPlay"));
      // presentationNav();
      localStorage.setItem("introPlay", "yes");
    }
  }
  //categoryLink = $('#top-menu>li>a');
  //  console.log(categoryLink);
  categoryLink.click(function(e){
    //  e.preventDefault();
    console.log('categoryLink');
    //goSectionNav()
    //if(lpHome.hasClass('lp-active')){ lpHome.removeClass('lp-active'); }
    logoComportement();
  })

}
function langRedesign() {
  //langMenu
  $('.qtranxs-lang-menu >a').css({
    'display' : 'none'
  })
}

function modList(){
  if(topMenu.find('.active').find('.sub-menu>li').length <= 2){
    topMenu.find('.active').find('.sub-menu').addClass('push-top');
  }
}

function socialLangDisplace(e) {
  if (e) {
    socialItem.detach().appendTo(footerMobile);
    langMenu.detach().appendTo(footerMobile);
    socialLangDisplacement = true;
  } else if (!e && socialLangDisplacement) {
    socialItem.detach().appendTo(topMenu);
    langMenu.detach().appendTo(topMenu);
    socialLangDisplacement = false;
  }
}

export function changeRubrique(rub) {

  let menuLink = $('.menu-item a');
  let lang = Store.getState().lang;
  let category = Store.getState().category;

  menuLink.parent().removeClass('active');
  let activeSubLink = $('#top-menu>li').find('li [title='+rub+']').parent()
  activeSubLink.addClass('active')
  activeSubLink.parent().parent().addClass('active');

  // history.pushState(baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/');

}


function logoComportement(e) {
  //let target = $(e.target)
  console.log(e);
  console.log(navState);
  if(e){e.preventDefault();}
  switch (navState) {
    case "category":
    goRubriqueNav();
    navState = "rubrique";

    lpHome.addClass('lp-active');
    break;
    case "rubrique":
    goSectionNav();
    navState = "category";
    lpHome.removeClass('lp-active');
    break;
  }
}

function toggleHide() {
  if(!toggleNav){
    lpHome.off('click');
    topMenu.addClass('hide-lp');
    //toggleNav = !toggleNav;
  }else {
    lpHome.click(logoComportement);
    topMenu.removeClass('hide-lp');
    //toggleNav = !toggleNav;
  }
  toggleNav = !toggleNav;
}

export function goRubriqueNav() {
  toggleHide();
  topMenu.one(transitionEvent, function(e){

    topMenu.addClass('pre-mob')
    toggleHide();
  });
}

export function goSectionNav() {
  toggleHide();
  topMenu.one(transitionEvent, function(e){

    topMenu.removeClass('pre-mob')
    if(Store.getState().isMobile){modList();}

    toggleHide();
  });
}