
$ = jQuery;

import Sammy from 'sammy';
import {sendPost} from './ajaxManager'
import {Store} from './states'
// import {changeRubrique} from './user-interface/menu';
const baseUrl = '/portique_test_room/proj2';
import {MenuInit} from './user-interface/menu';
import {userInterfaceStart} from './user-interface/user-interface';

const SammyApp = Sammy(function () {
  this.debug = true;
  this.get('/:lang/expositions/archives/:post', function() {
    let postMessage = {
      'post_title' : this.params['post'],
      'post_ID' : undefined
    }

    let urlMessage = {
      'category': 'expositions',
      'rubrique': 'archives',
      'postMessage' : postMessage
    }

    //urlMessage.postMessage = postMessage;

    console.log(postMessage);
    Store.dispatch({type:'CHANGE_RUB', rubrique: urlMessage})

  });
  this.get('/:lang/:name/:id/', function() {
    let urlMessage = {
      'category': this.params['name'],
      'rubrique': this.params['id']
    }
    Store.dispatch({type:'CHANGE_RUB', rubrique: urlMessage})

  });
  this.get('/:lang/:name/', function() {
    let urlMessage = {
      'category': this.params['name'],
      'rubrique': undefined
    }
    Store.dispatch({type:'CHANGE_RUB', rubrique: urlMessage})

  });
  this.get('/:lang/', function() {
    let urlMessage = {
      'category': 'expositions',
      'rubrique': 'en-cours'
    }
    Store.dispatch({type:'CHANGE_RUB', rubrique: urlMessage})



  });
  this.notFound = function(){
    // do something
  }
})

$(function() {
  MenuInit();

  SammyApp.run();
  userInterfaceStart();

});
