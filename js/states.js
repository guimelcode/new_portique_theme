
$ = jQuery;
import { createStore } from 'redux'
import {sendPost, archivePost} from './ajaxManager'
import {Menu, changeRubrique} from './user-interface/menu'
import {SwipperSystem, SliderChangeRubrique} from './user-interface/content-ui';

let bl = window.location.pathname.replace(/^\/|\/$/g, '');
let regEx = new RegExp("^[A-Za-z]{2}");

console.log(regEx.exec(bl)[0]);

const initStates = {
  lang : regEx.exec(bl)[0],
  title : 'Expositions',
  url: '/',
  category : 'expositions',
  // category : 'billy',
  rubrique : 'en-cours',
  loaded : false,
  isMobile : false,
  isSinglePost : false,
  postName: '',
}

function AppStates(state=initStates, action){
  switch (action.type) {
    case "CHANGE_LANGUAGE":
    // console.log(state.lang);
    if(state.lang !== action.lang &&( action.lang === "fr"||action.lang === "en")){
      console.log('CHANGE_LANGUAGE Function');
      if(!state.loaded){

        //
      }
      // location.reload(true);
      if(state.rubrique){
        location.replace('http://debug.leportique.org/'+ action.lang +'/'+ state.category + '/' + state.rubrique);
        location.reload(true)
      }else{
        location.replace('http://debug.leportique.org/'+ action.lang +'/'+ state.category );
        location.reload(true)
        

      }
// console.log(document.referrer);
      //rubriqueCheck(Store.getState(), state.rubrique);
      return Object.assign({}, state, {
        lang: action.lang
      })
    }else{
      return state
    }
    break;
    case "CHANGE_TITLE":
    return Object.assign({}, state, {
      lang: action.title
    })
    break;
    case "CHANGE_URL":
    return Object.assign({}, state, {
      lang: action.url
    })
    break;
    case "CHANGE_CAT":
    console.log('CHANGE_CAT')
    return Object.assign({}, state, {
      category: action.category
    })
    break;
    case "CHANGE_RUB":
    console.log('CHANGE_RUB')
    rubriqueCheck(Store.getState(), action.rubrique);
    return Object.assign({}, state, {
      rubrique: action.rubrique.rubrique
    })

    break;
    case "CHANGE_LOADED":
    console.log('CHANGE_LOADED');
    return Object.assign({}, state, {
      loaded: action.loaded
    })
    case "CHANGE_MOBILE":
    Menu(action.isMobile);
    return Object.assign({}, state, {
      isMobile: action.isMobile
    })
    break;
    case "CHANGE_SINLEGPOST":
    return Object.assign({}, state, {
      isSinglePost: action.isSinglePost
    })
    break;
    case "CHANGE_POSTNAME":
    return Object.assign({}, state, {
      postName: action.postName
    })
    break;
    default:
    return state


  }
}

export const Store = createStore(AppStates)


// REDUX DEBUG
Store.subscribe(() =>{
  console.log('REDUX DEBUG');
  console.log(Store.getState())
})

// LOT DE FUNCTION DE MANAGEMENT
function rubriqueCheck(state, newState) {
  console.log(newState);
  if(!state.loaded){
    if(newState.postMessage){
      console.log('ARCHIVES');
      let msg = {
        category : state.category,
        rubrique :  'archives'
      }
      state.postName = newState.postMessage.post_title;
      state.isSinglePost = true;


      sendPost(msg, function(){
        archivePost(newState.postMessage.post_ID, newState.postMessage.post_title)
        changeRubrique(msg.rubrique);
      });

    } else if (newState.category === state.category) {
      let msg = {
        category : state.category,
        rubrique :  state.rubrique
      }

      changeRubrique(msg.rubrique);

      sendPost(msg);


    }else if(!newState.rubrique){
      // console.log('pas de rub');
      checkDefaultRubrique(newState, function(newRub){
        newState.rubrique = newRub
        state.category = newState.category;
        changeRubrique(newRub);

        sendPost(newState);
      });
      state.postName = null;
      state.isSinglePost = false;
    }else {
      state.category = newState.category;
      changeRubrique(newState.rubrique);

      sendPost(newState);
      state.postName = null;
      state.isSinglePost = false;
    }

  }else {
    // console.log('COUCOU chargé !');
    // console.log(newState);
    // console.log(state);

    if(newState.category !== state.category){
      state.postName = null;
      state.isSinglePost = false;
      // Changement de category ; donc AJAX ;
      // recupération de la category et de la rubrique.
      // console.log('changement de cat loaded');
      state.category = newState.category;
      // console.log(newState.category);
      checkDefaultRubrique(newState, function(newRub){
        // console.log(newRub);
        changeRubrique(newRub);

        sendPost(newState);
      });



    }else {
      //SliderChangeRubrique(newState.rubrique)
      changeRubrique(newState.rubrique);
      SwipperSystem.slideTo($('#app').find('.'+newState.rubrique).first().index());

    }

  }
}

function checkDefaultRubrique(newState, cb) {
  let defaultRubrique;
  switch (newState.category) {
    case 'expositions':
    defaultRubrique = 'en-cours'
    break;
    case 'mediations':
    defaultRubrique = 'jeunes-publics'
    break;
    case 'informations':
    defaultRubrique = 'nous-trouver'
    break;
    case 'presse':
    defaultRubrique = 'contact-presse'
    break;
  }
  cb(defaultRubrique)
}
// MOBILE
function IsMobile(state) {
  return state.isMobile
}
/*
let MobileCurrentValue
function handleChange() {
let previousValue = MobileCurrentValue
MobileCurrentValue = IsMobile(Store.getState())

if (previousValue !== MobileCurrentValue) {
Menu(MobileCurrentValue);
}
}

Store.subscribe(handleChange)
*/
