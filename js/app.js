//Require scripts
require('./script')

// import {sendPost} from './ajaxManager'
//
// sendPost({'category': 'expositions'})
// import {Compare, CompareAll} from './states';
require('./routes');
require('./user-interface/user-interface');
import {Store} from './states'



//Store.dispatch({type:'CHANGE_LANGUAGE', lang: 'en'})
