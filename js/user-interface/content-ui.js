$ = jQuery;

import Swiper from 'swiper'
import {Store} from '../states'
import {archivePost} from '../ajaxManager';
// import * from './menu';
export let SwipperSystem;

//const baseUrl = '/portique_test_room/proj2';
const baseUrl = '';


function ContentClean(cb) {
  $('#app').fadeOut(300, function(){
    // console.log('ContentClean finish');
    cb();
  })
}

function ContentDisplay(cb) {
  $('#app').fadeIn(200, function(){
    // console.log('ContentDisplay finish');
    cb();
  })
}

export function ContentInject(data, cb) {
  ContentClean(function () {

    $('#app').empty();
    $('#app').html(data);
    // mainApp.html(data);
    ContentDisplay(function(){
      Slider();
      GallerySlider()
      // console.log($($(data)[0]).attr('id'));
      if($($(data)[0]).attr('id')){Archives()}

      cb();
    });
  })

}

function GallerySlider(){
  console.log('GallerySlider GO');
  console.log($('.imgWrap'));
  let imgSwiper = new Swiper('.imgGal', {
    // 'speed': 500,
    // 'direction' : 'horizontal',
    'nextButton': '.img-next-control',
    'prevButton': '.img-prev-control',
    // 'wrapperClass' : 'imgWrap',
    // 'slideClass': 'img-swiper-slide',
    // 'slidesPerView': 1,
     'nested': true,
    // 'touchEventsTarget' : 'wrapper',
    // 'width' : '100%',
    // // 'simulateTouch':false,
    // // 'spaceBetween': 300,
    //     'effect': 'fade'
  });
  console.log(imgSwiper);
}

function Slider() {
  console.log('Slider GO');

  SwipperSystem = new Swiper('#'+Store.getState().category+'', {
    'speed': 500,
    'direction' : 'horizontal',
    'nextButton': '.swiper-button-next',
    'prevButton': '.swiper-button-prev',
    'slidesPerView': 1,
    onSlideNextEnd : function () {
      //  Store.dispatch({type:'CHANGE_RUB', rubrique: $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]})
      // console.log($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      //  changeRubrique($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      // mainMenu.changeRubrique(jQuery('.swiper-wrapper').children().eq(SlideSystem.activeIndex).attr('class').split(' ')[0])
      let rub = $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]
      SliderChangeRubrique(rub)
    },
    onSlidePrevEnd : function () {
      // Store.dispatch({type:'CHANGE_RUB', rubrique: $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]})

      // mainMenu.changeRubrique(jQuery('.swiper-wrapper').children().eq(SlideSystem.activeIndex).attr('class').split(' ')[0])
      //    changeRubrique($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      console.log($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);




      let rub = $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]
      SliderChangeRubrique(rub)

    }
  })
  SwipperSystem.slideTo($('#app').find('.'+Store.getState().rubrique).first().index());

}

export function SliderChangeRubrique(rub) {
  let lang = Store.getState().lang;
  let category = Store.getState().category;
  if(rub === 'archives' && Store.getState().isSinglePost){
    console.log(Store.getState().rubrique);
    console.log('coiu');
    history.pushState(baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/'+Store.getState().postName);

  }else{
    history.pushState(baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/');
  }

}

//ARCHIVES
export function Archives() {
  let archivesLink = $('.archive-link');
  let lang = Store.getState().lang;
  let category = Store.getState().category;
  let rub = 'archives';

  archivesLink.click(function (e) {
    e.preventDefault();
    let postID = $(this).attr("postID");
    let postName =  $(this).attr("name");
    archivePost(postID, null, function(){
      Store.dispatch({type:'CHANGE_SINLEGPOST', isSinglePost: true})
      Store.dispatch({type:'CHANGE_POSTNAME', postName:  postName})
      history.pushState(baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/'+postName);
    })

  })
}
