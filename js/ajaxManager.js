$ = jQuery;
import {ContentInject} from './user-interface/content-ui';
import {Store} from './states'


export function sendPost(msg, cb) {


  $.ajax({
    url: adminAjax,
    method: 'POST',
    data : {
      action : msg['category'],
      rub : msg['rubrique'] // Optionnel !

    },
    success: function(data) {
      // console.log('--- Ajax Success ---');
      //console.log(data);
      //  console.log('--- Ajax End ---');

      ContentInject(data, function(){
        // console.log('Content Inject CB');
        // Store.dispatch({type:'CHANGE_RUB', rubrique: msg.rubrique})


        Store.dispatch({type:"CHANGE_LOADED", loaded: true})
        if(cb){
          cb();
        }
      });
      //$('#app').html(data)
      // ContentUI.inject(data);
      // States.States.category =  msg['category']
      // States.States.rubrique =  msg['rubrique']
      // States.States.loaded = true;
      // return `<h1>Page Two</h1>`;

    }
  }

)
}

export function archivePost(postID, postTitle, cb) {
  console.log(postID);
  console.log(postTitle);
  $.ajax({
    url : adminAjax,
    method : 'POST',
    data : {
      action : 'archives_get_post',
      postID : postID,
      postTitle : postTitle
    },
    success : function( data ) {
      // console.log(data);
      // console.log($( '.archives-hover' ).find('.content'));


      // $( '.archives-hover' ).toggleClass('visu');

      ///
      let prevStateSinglePost = Store.getState().isSinglePost;
      let archivesHover = $('.archives-hover');
      let archivesArticle = $('.archives').children().eq(1);
      console.log(prevStateSinglePost);
      if (!prevStateSinglePost) {
        console.log('SCROLL Fuchk !!!!');
          $( '.archives-hover' ).find('.content').empty().html(data);
        archivesHover.slideDown();
      }else {
        // console.log('SCROLL !!!!');
        // console.log(archivesHover.find('.thePostText').height());
        //
        // $('.archives').animate({
        //   // scrollTop :$('.archives').scrollTop()-50
        //   scrollTop :archivesHover.find('.thePostText').height()
        // },{
        //   duration :  850
        // }).promise().done(function(){
        //   setTimeout(function(){
        //       $( '.archives-hover' ).find('.content').empty().html(data);
        //     console.log('Scrolltop complete');
        //     archivesHover.slideUp(800, 'linear', function(){
        //       setTimeout(function(){
        //         archivesHover.slideDown(1000);
        //       }, 800)
        //
        //     });
        //   }, 1000)
        //
        // })
        console.log('SCROLL !!!!');
        // $('.archives').animate({
        //   scrollTop : archivesHover.find('.thePostText').height()
        // }, 800).promise().done(function(){
          archivesHover.slideUp(1200, 'linear', function(){
            $( '.archives-hover' ).find('.content').empty().html(data).promise().done(function(){
              archivesHover.slideDown(1000);
            })
          })
        // })

      }

    },
    error : function( data ) {
      console.log(data)

      console.log( 'Erreur…' );
    }
  }
);
if(cb){
  cb()

}
}
