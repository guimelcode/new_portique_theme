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
      $( '.archives-hover' ).find('.content').empty().html(data);

      $( '.archives-hover' ).toggleClass('visu');

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
