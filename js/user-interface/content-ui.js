$ = jQuery;

import Swiper from 'swiper'
import {Store} from '../states'
import {archivePost} from '../ajaxManager';
import {render_map} from '../google-maps.js';
import SimpleBar from 'simplebar';
// import * from './menu';
export let SwipperSystem;

//const baseUrl = '/portique_test_room/proj2';
const baseUrl = '';

function ContentClean(cb) {
  $('#app').fadeOut(300, function() {
    // console.log('ContentClean finish');
    cb();
  })
}

function ContentDisplay(cb) {
  $('#app').fadeIn(200, function() {
    // console.log('ContentDisplay finish');

    console.log(SimpleBar);
    let slides = $(this).find('.swiper-slide');
    // console.log(slides);
    for (var i = 0; i < slides.length; i++) {
      console.log(slides[i]);
      new SimpleBar(slides[i], {
        scrollbarMinSize : 4
      });

    }
    // new SimpleBar($('.swiper-slide'), {
    //   scrollbarMinSize : 4
    // })
    cb();
  })


}

export function ContentInject(data, cb) {
  ContentClean(function() {

    $('#app').empty();
    $('#app').html(data);
    // mainApp.html(data);
    ContentDisplay(function() {
      Slider();
      GallerySlider()
      // console.log($($(data)[0]).attr('id'));
      if ($($(data)[0]).attr('id')) {
        Archives()
      }
      console.log('TESTESTESTEStttttt');
      console.log($('.acf-map').length);
      if ($('.acf-map').length > 0) {
        $('.acf-map').each(function() {

          render_map($(this));

        });
      }
      cb();
    });
  })

}

export function GallerySlider() {
  console.log('GallerySlider GO');
  console.log($('.imgWrap'));
  let imgSwiper = new Swiper('.imgGal', {
    // 'speed': 500,
    // 'direction' : 'horizontal',
    nextButton: '.img-next-control',
    prevButton: '.img-prev-control',
    // 'wrapperClass' : 'imgWrap',
    // 'slideClass': 'img-swiper-slide',
    // 'slidesPerView': 1,
    nested: true,
    // 'touchEventsTarget' : 'wrapper',
    // 'width' : '100%',
    //  'simulateTouch':false,
    //  'spaceBetween': 300,
    //     'effect': 'fade'
    preloadImages: false,
    // Enable lazy loading
    lazyLoading : {
      loadPrevNext: true,
    },
    watchSlidesVisibility: true

  });
  console.log(imgSwiper);
  console.log(imgSwiper[0]);
  //console.log(imgSwiper[0].lazy);
  // imgSwiper.lazy.load(function(){
  //   console.log('MERDEDEDEDE');
  // })
}

function Slider() {
  console.log('Slider GO');

  SwipperSystem = new Swiper('#' + Store.getState().category + '', {
    'speed': 500,
    'direction': 'horizontal',
    'touchReleaseOnEdges': true,
    'nextButton': '.swiper-button-next',
    'prevButton': '.swiper-button-prev',
    'slidesPerView': 1,
    onSlideNextEnd: function() {
      //  Store.dispatch({type:'CHANGE_RUB', rubrique: $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]})
      // console.log($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      //  changeRubrique($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      // mainMenu.changeRubrique(jQuery('.swiper-wrapper').children().eq(SlideSystem.activeIndex).attr('class').split(' ')[0])
      let rub = $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]
      SliderChangeRubrique(rub)
    },
    onSlidePrevEnd: function() {
      // Store.dispatch({type:'CHANGE_RUB', rubrique: $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]})

      // mainMenu.changeRubrique(jQuery('.swiper-wrapper').children().eq(SlideSystem.activeIndex).attr('class').split(' ')[0])
      //    changeRubrique($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      console.log($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);

      let rub = $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]
      SliderChangeRubrique(rub)

    }
  })
  SwipperSystem.slideTo($('#app').find('.' + Store.getState().rubrique).first().index());

}

export function SliderChangeRubrique(rub) {
  let lang = Store.getState().lang;
  let category = Store.getState().category;
  if (rub === 'archives' && Store.getState().isSinglePost) {
    console.log(Store.getState().rubrique);
    console.log('coiu');
    history.pushState(baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/' + Store.getState().postName);

  } else {
    history.pushState(baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/');
  }

}

//ARCHIVES
export function Archives() {
  let archivesLink = $('.archive-link');
  let lang = Store.getState().lang;
  let category = Store.getState().category;
  let rub = 'archives';
  let archivesHover = $('.archives-hover');
  // archivesHover.hide();
  archivesLink.click(function(e) {
    e.preventDefault();
    let postID = $(this).attr("postID");
    let postName = $(this).attr("name");
    let prevStateSinglePost = false;
    archivePost(postID, null, function() {
      // console.log(Store.getState().isSinglePost);
      prevStateSinglePost = Store.getState().isSinglePost;
      Store.dispatch({type: 'CHANGE_SINLEGPOST', isSinglePost: true})
      Store.dispatch({type: 'CHANGE_POSTNAME', postName: postName})
      history.pushState(baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/' + postName);
    })
    let archivesArticle = $('.archives').children().eq(1);

    console.log(archivesArticle);
    // archivesArticle.slideDown();
    //  archivesArticle.slideUp();

    // if (!prevStateSinglePost) {
    //   console.log('SCROLL Fuchk !!!!');
    //
    //   archivesHover.slideDown();
    // }else {
    //     $('.archives').animate({
    //          scrollTop: 0
    //      }, 700);
    //   console.log('SCROLL !!!!');
    //   console.log(archivesHover.find('.thePostText').height());
    //
    //   $('.archives').animate({
    //      scrollTop :$('.archives').scrollTop()-50
    //     scrollTop :archivesHover.find('.thePostText').height()
    //   },{
    //     duration :  800
    //   }).promise().done(function(){
    //     setTimeout(function(){
    //       console.log('Scrolltop complete');
    //       archivesHover.slideUp(1200, 'linear', function(){
    //         setTimeout(function(){
    //           archivesHover.slideDown();
    //         }, 1100)
    //
    //       });
    //     }, 2000)
    //
    //   })
    //    setTimeout(function(){
    //      $('.archives').animate({
    //            scrollTop: 0
    //        }, 700, 'linear', function(){
    //          archivesHover.slideDown();
    //
    //        });
    //    }, 1100)
    // }

  })
}
