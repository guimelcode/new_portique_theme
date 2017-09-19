/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;

var _redux = __webpack_require__(18);

var _ajaxManager = __webpack_require__(2);

var _menu = __webpack_require__(3);

var _contentUi = __webpack_require__(11);

$ = jQuery;


var initStates = {
  lang: 'fr',
  title: 'Expositions',
  url: '/',
  category: 'expositions',
  // category : 'billy',
  rubrique: 'en-cours',
  loaded: false,
  isMobile: false,
  isSinglePost: false,
  postName: ''
};

function AppStates() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initStates;
  var action = arguments[1];

  switch (action.type) {
    case "CHANGE_LANGUAGE":
      // console.log(state.lang);
      if (state.lang !== action.lang && (action.lang === "fr" || action.lang === "en")) {
        console.log('CHANGE_LANGUAGE Function');
        return Object.assign({}, state, {
          lang: action.lang
        });
      } else {
        return state;
      }
      break;
    case "CHANGE_TITLE":
      return Object.assign({}, state, {
        lang: action.title
      });
      break;
    case "CHANGE_URL":
      return Object.assign({}, state, {
        lang: action.url
      });
      break;
    case "CHANGE_CAT":
      console.log('CHANGE_CAT');
      return Object.assign({}, state, {
        category: action.category
      });
      break;
    case "CHANGE_RUB":
      console.log('CHANGE_RUB');
      rubriqueCheck(Store.getState(), action.rubrique);
      return Object.assign({}, state, {
        rubrique: action.rubrique.rubrique
      });

      break;
    case "CHANGE_LOADED":
      console.log('CHANGE_LOADED');
      return Object.assign({}, state, {
        loaded: action.loaded
      });
    case "CHANGE_MOBILE":
      (0, _menu.Menu)(action.isMobile);
      return Object.assign({}, state, {
        isMobile: action.isMobile
      });
      break;
    case "CHANGE_SINLEGPOST":
      return Object.assign({}, state, {
        isSinglePost: action.isSinglePost
      });
      break;
    case "CHANGE_POSTNAME":
      return Object.assign({}, state, {
        postName: action.postName
      });
      break;
    default:
      return state;

  }
}

var Store = exports.Store = (0, _redux.createStore)(AppStates);

// REDUX DEBUG
Store.subscribe(function () {
  console.log('REDUX DEBUG');
  console.log(Store.getState());
});

// LOT DE FUNCTION DE MANAGEMENT
function rubriqueCheck(state, newState) {
  console.log(newState);
  if (!state.loaded) {
    if (newState.postMessage) {
      console.log('ARCHIVES');
      var msg = {
        category: state.category,
        rubrique: 'archives'
      };
      state.postName = newState.postMessage.post_title;
      state.isSinglePost = true;

      (0, _ajaxManager.sendPost)(msg, function () {
        (0, _ajaxManager.archivePost)(newState.postMessage.post_ID, newState.postMessage.post_title);
        (0, _menu.changeRubrique)(msg.rubrique);
      });
    } else if (newState.category === state.category) {
      var _msg = {
        category: state.category,
        rubrique: state.rubrique
      };

      (0, _menu.changeRubrique)(_msg.rubrique);

      (0, _ajaxManager.sendPost)(_msg);
    } else if (!newState.rubrique) {
      // console.log('pas de rub');
      checkDefaultRubrique(newState, function (newRub) {
        newState.rubrique = newRub;
        state.category = newState.category;
        (0, _menu.changeRubrique)(newRub);

        (0, _ajaxManager.sendPost)(newState);
      });
      state.postName = null;
      state.isSinglePost = false;
    } else {
      state.category = newState.category;
      (0, _menu.changeRubrique)(newState.rubrique);

      (0, _ajaxManager.sendPost)(newState);
      state.postName = null;
      state.isSinglePost = false;
    }
  } else {
    // console.log('COUCOU chargé !');
    // console.log(newState);
    // console.log(state);

    if (newState.category !== state.category) {
      state.postName = null;
      state.isSinglePost = false;
      // Changement de category ; donc AJAX ;
      // recupération de la category et de la rubrique.
      // console.log('changement de cat loaded');
      state.category = newState.category;
      // console.log(newState.category);
      checkDefaultRubrique(newState, function (newRub) {
        // console.log(newRub);
        (0, _menu.changeRubrique)(newRub);

        (0, _ajaxManager.sendPost)(newState);
      });
    } else {
      //SliderChangeRubrique(newState.rubrique)
      (0, _menu.changeRubrique)(newState.rubrique);
      _contentUi.SwipperSystem.slideTo($('#app').find('.' + newState.rubrique).first().index());
    }
  }
}

function checkDefaultRubrique(newState, cb) {
  var defaultRubrique = void 0;
  switch (newState.category) {
    case 'expositions':
      defaultRubrique = 'en-cours';
      break;
    case 'mediations':
      defaultRubrique = 'jeunes-publics';
      break;
    case 'informations':
      defaultRubrique = 'nous-trouver';
      break;
    case 'presse':
      defaultRubrique = 'contact-presse';
      break;
  }
  cb(defaultRubrique);
}
// MOBILE
function IsMobile(state) {
  return state.isMobile;
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPost = sendPost;
exports.archivePost = archivePost;

var _contentUi = __webpack_require__(11);

var _states = __webpack_require__(0);

$ = jQuery;
function sendPost(msg, cb) {

  $.ajax({
    url: adminAjax,
    method: 'POST',
    data: {
      action: msg['category'],
      rub: msg['rubrique'] // Optionnel !

    },
    success: function success(data) {
      // console.log('--- Ajax Success ---');
      //console.log(data);
      //  console.log('--- Ajax End ---');

      (0, _contentUi.ContentInject)(data, function () {
        // console.log('Content Inject CB');
        // Store.dispatch({type:'CHANGE_RUB', rubrique: msg.rubrique})


        _states.Store.dispatch({ type: "CHANGE_LOADED", loaded: true });
        if (cb) {
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
  });
}

function archivePost(postID, postTitle, cb) {
  console.log(postID);
  console.log(postTitle);
  $.ajax({
    url: adminAjax,
    method: 'POST',
    data: {
      action: 'archives_get_post',
      postID: postID,
      postTitle: postTitle
    },
    success: function success(data) {
      // console.log(data);
      // console.log($( '.archives-hover' ).find('.content'));
      $('.archives-hover').find('.content').empty().html(data);

      $('.archives-hover').toggleClass('visu');
    },
    error: function error(data) {
      console.log(data);

      console.log('Erreur…');
    }
  });
  if (cb) {
    cb();
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuInit = MenuInit;
exports.Menu = Menu;
exports.changeRubrique = changeRubrique;
exports.goRubriqueNav = goRubriqueNav;
exports.goSectionNav = goSectionNav;

var _toolBoxUi = __webpack_require__(12);

var _states = __webpack_require__(0);

$ = jQuery;

// Variables
var transitionEvent = void 0,
    menuMainContainer = void 0,
    topMenu = void 0,
    categoryLink = void 0,
    rubriqueLink = void 0,
    lpHome = void 0,
    socialItem = void 0,
    langMenu = void 0,
    footerMobile = void 0;
var toggleNav = false;
var socialLangDisplacement = false;
var navState = 'category';
var baseUrl = '/portique_test_room/proj2';

function MenuInit() {
  // Init Variables
  transitionEvent = (0, _toolBoxUi.whichTransitionEvent)();
  menuMainContainer = $('.main-navigation');
  topMenu = $('#top-menu');
  categoryLink = $('#top-menu>li>a');
  rubriqueLink = $('.sub-menu>li>a');
  socialItem = $('.social-icon');
  lpHome = $('.lp-home');
  langMenu = $('.qtranxs-lang-menu-item');
  footerMobile = $('#mobile-footer');

  if (!localStorage.getItem("introPlay")) {
    localStorage.setItem("introPlay", false); //what ?
  }
  console.log('MENU !!!!!!!!!!!!!!!!!!!!');

  langRedesign();
}

function Menu(isMobile) {
  // console.log($('.lp-home'));
  //lpHome = $('.lp-home');
  lpHome.click(logoComportement);
  socialLangDisplace(isMobile);
  if (isMobile) {
    modList();
    if (localStorage.getItem("introPlay") == "no") {
      console.log(localStorage.getItem("introPlay"));
      // presentationNav();
      localStorage.setItem("introPlay", "yes");
    }
  }
  //categoryLink = $('#top-menu>li>a');
  //  console.log(categoryLink);
  categoryLink.click(function (e) {
    //  e.preventDefault();
    console.log('categoryLink');
    //goSectionNav()
    //if(lpHome.hasClass('lp-active')){ lpHome.removeClass('lp-active'); }
    logoComportement();
  });
}
function langRedesign() {
  //langMenu
  $('.qtranxs-lang-menu >a').css({
    'display': 'none'
  });
}

function modList() {
  if (topMenu.find('.active').find('.sub-menu>li').length <= 2) {
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

function changeRubrique(rub) {

  var menuLink = $('.menu-item a');
  var lang = _states.Store.getState().lang;
  var category = _states.Store.getState().category;

  menuLink.parent().removeClass('active');
  var activeSubLink = $('#top-menu>li').find('li [title=' + rub + ']').parent();
  activeSubLink.addClass('active');
  activeSubLink.parent().parent().addClass('active');

  // history.pushState(baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/', baseUrl+'/'+lang+'/'+category+'/'+rub+'/');
}

function logoComportement(e) {
  //let target = $(e.target)
  console.log(e);
  console.log(navState);
  if (e) {
    e.preventDefault();
  }
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
  if (!toggleNav) {
    lpHome.off('click');
    topMenu.addClass('hide-lp');
    //toggleNav = !toggleNav;
  } else {
    lpHome.click(logoComportement);
    topMenu.removeClass('hide-lp');
    //toggleNav = !toggleNav;
  }
  toggleNav = !toggleNav;
}

function goRubriqueNav() {
  toggleHide();
  topMenu.one(transitionEvent, function (e) {

    topMenu.addClass('pre-mob');
    toggleHide();
  });
}

function goSectionNav() {
  toggleHide();
  topMenu.one(transitionEvent, function (e) {

    topMenu.removeClass('pre-mob');
    if (_states.Store.getState().isMobile) {
      modList();
    }

    toggleHide();
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(26);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(20);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwipperSystem = undefined;
exports.ContentInject = ContentInject;
exports.SliderChangeRubrique = SliderChangeRubrique;
exports.Archives = Archives;

var _swiper = __webpack_require__(34);

var _swiper2 = _interopRequireDefault(_swiper);

var _states = __webpack_require__(0);

var _ajaxManager = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$ = jQuery;

// import * from './menu';
var SwipperSystem = exports.SwipperSystem = void 0;

//const baseUrl = '/portique_test_room/proj2';
var baseUrl = '';

function ContentClean(cb) {
  $('#app').fadeOut(300, function () {
    // console.log('ContentClean finish');
    cb();
  });
}

function ContentDisplay(cb) {
  $('#app').fadeIn(200, function () {
    // console.log('ContentDisplay finish');
    cb();
  });
}

function ContentInject(data, cb) {
  ContentClean(function () {

    $('#app').empty();
    $('#app').html(data);
    // mainApp.html(data);
    ContentDisplay(function () {
      Slider();
      GallerySlider();
      // console.log($($(data)[0]).attr('id'));
      if ($($(data)[0]).attr('id')) {
        Archives();
      }

      cb();
    });
  });
}

function GallerySlider() {
  console.log('GallerySlider GO');
  console.log($('.imgWrap'));
  var imgSwiper = new _swiper2.default('.imgGal', {
    // 'speed': 500,
    // 'direction' : 'horizontal',
    'nextButton': '.img-next-control',
    'prevButton': '.img-prev-control',
    // 'wrapperClass' : 'imgWrap',
    // 'slideClass': 'img-swiper-slide',
    // 'slidesPerView': 1,
    'nested': true
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

  exports.SwipperSystem = SwipperSystem = new _swiper2.default('#' + _states.Store.getState().category + '', {
    'speed': 500,
    'direction': 'horizontal',
    'nextButton': '.swiper-button-next',
    'prevButton': '.swiper-button-prev',
    'slidesPerView': 1,
    onSlideNextEnd: function onSlideNextEnd() {
      //  Store.dispatch({type:'CHANGE_RUB', rubrique: $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]})
      // console.log($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      //  changeRubrique($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      // mainMenu.changeRubrique(jQuery('.swiper-wrapper').children().eq(SlideSystem.activeIndex).attr('class').split(' ')[0])
      var rub = $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0];
      SliderChangeRubrique(rub);
    },
    onSlidePrevEnd: function onSlidePrevEnd() {
      // Store.dispatch({type:'CHANGE_RUB', rubrique: $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]})

      // mainMenu.changeRubrique(jQuery('.swiper-wrapper').children().eq(SlideSystem.activeIndex).attr('class').split(' ')[0])
      //    changeRubrique($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);
      console.log($('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0]);

      var rub = $('.swiper-wrapper').children().eq(SwipperSystem.activeIndex).attr('class').split(' ')[0];
      SliderChangeRubrique(rub);
    }
  });
  SwipperSystem.slideTo($('#app').find('.' + _states.Store.getState().rubrique).first().index());
}

function SliderChangeRubrique(rub) {
  var lang = _states.Store.getState().lang;
  var category = _states.Store.getState().category;
  if (rub === 'archives' && _states.Store.getState().isSinglePost) {
    console.log(_states.Store.getState().rubrique);
    console.log('coiu');
    history.pushState(baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/' + _states.Store.getState().postName);
  } else {
    history.pushState(baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/');
  }
}

//ARCHIVES
function Archives() {
  var archivesLink = $('.archive-link');
  var lang = _states.Store.getState().lang;
  var category = _states.Store.getState().category;
  var rub = 'archives';

  archivesLink.click(function (e) {
    e.preventDefault();
    var postID = $(this).attr("postID");
    var postName = $(this).attr("name");
    (0, _ajaxManager.archivePost)(postID, null, function () {
      _states.Store.dispatch({ type: 'CHANGE_SINLEGPOST', isSinglePost: true });
      _states.Store.dispatch({ type: 'CHANGE_POSTNAME', postName: postName });
      history.pushState(baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/', baseUrl + '/' + lang + '/' + category + '/' + rub + '/' + postName);
    });
  });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whichTransitionEvent = whichTransitionEvent;
exports.WidthChange = WidthChange;
exports.OrientationHandler = OrientationHandler;

var _states = __webpack_require__(0);

function whichTransitionEvent() {
  var t = void 0,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
} //export let isMobile = false;
function WidthChange(mq) {
  if (mq.matches) {
    // window width is at least 992px
    console.log("window width is at least 992px");
    //isMobile = false;
    // console.log('mq.matches : '+ isMobile);
    // Menu();
    _states.Store.dispatch({ type: 'CHANGE_MOBILE', isMobile: false });
  } else {
    // window width is less than 992px
    console.log("window width is less 992px");
    _states.Store.dispatch({ type: 'CHANGE_MOBILE', isMobile: true });
    //isMobile = true;
    // console.log('mq.matches : '+ isMobile);
    // MenuMobile();
  }
}

function OrientationHandler(orientation) {
  //console.log(orientation.matches);
  if (orientation.matches) {
    $('.site').addClass('landscape');
  } else {
    if ($('.site').hasClass('landscape')) {
      $('.site').removeClass('landscape');
    };
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userInterfaceStart = userInterfaceStart;

var _bootstrap = __webpack_require__(39);

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _swiper = __webpack_require__(52);

var _swiper2 = _interopRequireDefault(_swiper);

var _main = __webpack_require__(55);

var _main2 = _interopRequireDefault(_main);

var _toolBoxUi = __webpack_require__(12);

var _menu = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$ = jQuery;

function userInterfaceStart() {

  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 768px)");
    mq.addListener(_toolBoxUi.WidthChange);
    (0, _toolBoxUi.WidthChange)(mq);

    var mql = window.matchMedia("(orientation: landscape)");
    mql.addListener(_toolBoxUi.OrientationHandler);
    (0, _toolBoxUi.OrientationHandler)(mql);
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(54);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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ALj+4QC5/uEAwP7hAMH+4QDC/uEAw/7hAMT+zQDH/uEAyP7hAMn+4QDK/uEAzf8KAM7/7AAMAB3/rgAy/9cANgAUADv/7ABI/9cAZAApAI7/wwCP/8MAkP/DAJH/wwCS/8MAk//DADIAHf64ADD/7AAy/9cANf+aADj+4QBB/8MASP/DAFr/1wBg/64AYf9xAI7/CgCP/woAkP8KAJH/CgCS/woAk/8KAJT+uACV/64Alv/sAJf/7ACY/+wAmf/sAKD/mgCh/5oAov+aAKP/mgCk/5oArv9cAK//XACw/1wAsf9cALL/XACz/1wAtP9xALX/XAC2/3EAt/9xALj/cQC5/3EAwP+FAMH/hQDC/4UAw/+FAMT/hQDH/64AyP+uAMn/rgDK/64Azv+aAM//XAAhAB3/hQA4/64Ajv/DAI//wwCQ/8MAkf/DAJL/wwCT/8MAoP/XAKH/1wCi/9cAo//XAKT/1wCu/9cAr//XALD/1wCx/9cAsv/XALP/1wC0/+wAtv/sALf/7AC4/+wAuf/sAMD/1wDB/9cAwv/XAMP/1wDE/9cAx//sAMj/7ADJ/+wAyv/sABYANf/DAJX/wwCg/9cAof/XAKL/1wCj/9cApP/XALT/1wC2/9cAt//XALj/1wC5/9cAwP/sAMH/7ADC/+wAw//sAMT/7ADH/9cAyP/XAMn/1wDK/9cAzf9cACkAHf7hADX/wwA4/woAUv9xAF7/mgBg/9cAYf+kAGT/rgBo/4UAjv9IAI//SACQ/0gAkf9IAJL/SACT/0gAoP+uAKH/rgCi/64Ao/+uAKT/rgCu/1wAr/9cALD/XACx/1wAsv9cALP/XAC0/0gAtv9IALf/SAC4/0gAuf9IAMD/SADB/0gAwv9IAMP/SADE/0gAx/+aAMj/mgDJ/5oAyv+aANAAKQAWADX/wwBEABQAlf/DAKD/wwCh/8MAov/DAKP/wwCk/8MAtP/XALb/1wC3/9cAuP/XALn/1wDA/8MAwf/DAML/wwDD/8MAxP/DAMf/1wDI/9cAyf/XAMr/1wAWAET/hQBgABQAZP/sAGX/1wB2/8MAif/XALr/1wC7/9cAvP/XAL3/1wDA/8MAwf/DAML/wwDD/8MAxP/DAMf/7ADI/+wAyf/sAMr/7ADQ/3EA5/+aAOz/cQATAB3/1wBQ/+wAZP/DAGb/1wC0ACkAtgApALcAKQC4ACkAuQApALr/7AC7/+wAvP/sAL3/7ADAABQAwQAUAMIAFADDABQAxAAUAM3/1wATAET/cQBf/9cAYv/DAGT/1wBo/9cArv/sAK//7ACw/+wAsf/sALL/7ACz/+wAtP/sALX/1wDA/9cAwf/XAML/7ADD/9cAxP/XAM3/1wALAFL/1wBVABQAVv/sAFj/wwBm/8MAwP/XAMH/1wDC/9cAw//XAMT/1wDN/9cAFQBE/64ARf/sAFX/7ABm/9cArv/sAK//7ACw/+wAsf/sALL/7ACz/+wAtP/sALYAFAC3ABQAuAAUALkAFADA/+wAwf/sAML/7ADD/+wAxP/sAND/SAAnAB3/MwBQ/9cAUv9xAFT/hQBV/1wAWP5mAFv/rgBe/8MAX/9cAGD/hQBh/4UAYv/XAGj/wwBx/woAdf8KAIT/MwCI/uEArv9xAK//cQCw/3EAsf9xALL/cQCz/3EAtP7hALX/hQC2/0gAt/9IALj/SAC5/0gAwP9IAMH/SADC/0gAw/9IAMT/SADH/8MAyP/DAMn/wwDK/8MA6P8zAAsAVQAUAF//7ABi/64AZf/sAK7/7ACv/+wAsP/sALH/7ACy/+wAs//sAM3/1wAJAFAAKQBVACkAVv/sAGL/1wC0ABQAtgAUALcAFAC4ABQAuQAUAA8Arv/XAK//1wCw/9cAsf/XALL/1wCz/9cAuv7NALv+zQC8/s0Avf7NAMD/1wDB/9cAwv/XAMP/1wDE/9cACAAdAFIAVf+aALT/7AC2/+wAt//sALj/7AC5/+wA7P72AAwAVP/DAFj/wwBf/+wAYf/XAGX/rgB1/9cAtf/XAMD/7ADB/+wAwv/sAMP/7ADE/+wABwBY/1wAXAApALQAFAC2ABQAtwAUALgAFAC5ABQACAAdACkAVP+uAFj/wwBi/+wAuv/sALv/7AC8/+wAvf/sABcARP+FAEX/1wBG/+wAUv/sAFT/rgBV/+wAYf/XAGL/1wBk/9cAZv/XAGj/wwC1/+wAwP/sAMH/7ADC/+wAw//sAMT/7ADH/+wAyP/sAMn/7ADK/+wAzf/XAND/HwALAGH/1wBi/9cAtAAdALYAHQC3AB0AuAAdALkAHQC6/+wAu//sALz/7AC9/+wAAgBS/9cAYv+uABkAHf+FAFL/rgBV/9cAXP/sAGAAFABh/+wAYgA9AK7/1wCv/9cAsP/XALH/1wCy/9cAs//XALT/7AC1/9cAtv/sALf/7AC4/+wAuf/sAMD/1wDB/9cAwv/XAMP/1wDE/9cAzf/XABAAUAAUAFT/1wBf/+wAYf/XAK7/7ACv/+wAsP/sALH/7ACy/+wAs//sALX/7ADA/+wAwf/sAML/7ADD/+wAxP/sACEASv+aAFL/1wBV/4UAX/+FAGL/1wBm/9cAcf7hAHX+4QCE/uEAiP7NAIv+zQC0/s0Atf+FALb/7AC3/+wAuP/sALn/7AC6/9cAu//XALz/1wC9/9cAwP/DAMH/wwDC/8MAw//DAMT/wwDH/9cAyP/XAMn/1wDK/9cAzf/DAOj+4QDp/woACAAdACkARP+uAFL/1wBWABQAWP9cAGj/1wDQ/5oA5wApAB0AHf+FAFD/7ABS/9cAVAApAFX/7ABbACkAcf9cAHP/XAB1/3EAhP+uAKcAKQCoACkAqQApAKoAKQCu/+wAr//sALD/7ACx/+wAsv/sALP/7AC1/9cAwP/XAMH/1wDC/9cAw//XAMT/1wDo/64A6f9xAPL/1wAPAB3/rgBx/9cAdf/sAK7/7ACv/+wAsP/sALH/7ACy/+wAs//sAMD/7ADB/+wAwv/sAMP/7ADE/+wA6P/sABAAUv+uAFX/wwBi/9cAdf/XALT/1wC1/8MAtv/XALf/1wC4/9cAuf/XAMD/1wDB/9cAwv9cAMP/1wDE/9cA6P/XABcAHf9cAFX/wwBbACkAcf9cAHX/MwCE/9cAjf+FAK7/1wCv/9cAsP/XALH/1wCy/9cAs//XALX/1wDA/+wAwf/sAML/7ADD/+wAxP/sAM0AKQDn/64A6P+aAOn/pAAKAFX/wwBkABQAdf/XALX/wwDA/8MAwf/DAML/wwDD/8MAxP/DAOj/1wADAGT/hQCEACkAzf9xAAUAFf9cAHH/cQBy/4UAdf9IAIT/cQABAGT/cQAEAGT/rgBl/+wAdQAUAM3/SAAEAHH/1wBy/8MA4f/sAPL/7AAEAHH/wwBz/9cAdf/XAOUAPQALADX/wwA//8MAQf/DAEL/7ABE/9cAlf+uAKD/wwCh/8MAov/DAKP/wwCk/8MADAA1/8MAP//DAEH/wwBC/+wARP/sAFL/7ACV/64AoP/DAKH/wwCi/8MAo//DAKT/wwAXAET/hQBgABQAYv/XAGT/7ABl/9cAdv/DAIn/1wC6/9cAu//XALz/1wC9/9cAwP/DAMH/wwDC/8MAw//DAMT/wwDH/+wAyP/sAMn/7ADK/+wA0P9xAOf/mgDs/3EAFQBE/64ARf/sAFX/1wBm/9cArv/sAK//7ACw/+wAsf/sALL/7ACz/+wAtP/sALYAFAC3ABQAuAAUALkAFADA/+wAwf/sAML/7ADD/+wAxP/sAND/SAAUAET/cQBf/9cAYv/DAGT/1wBo/9cArv/sAK//7ACw/+wAsf/sALL/7ACz/+wAtP/sALX/1wC3/9cAwP/XAMH/1wDC/+wAw//XAMT/1wDN/9cAFgBE/64ARf/sAFX/1wBgABQAZv/XAK7/7ACv/+wAsP/sALH/7ACy/+wAs//sALT/7AC2ABQAtwAUALgAFAC5ABQAwP/sAMH/7ADC/+wAw//sAMT/7ADQ/0gAGABE/4UARf/XAEb/7ABS/+wAVP+uAFX/7ABh/9cAYv+aAGT/1wBl/+wAZv/XAGj/wwC1/+wAwP/sAMH/7ADC/+wAw//sAMT/7ADH/+wAyP/sAMn/7ADK/+wAzf/XAND/HwAYAET/hQBF/9cARv/sAFL/7ABU/64AVf/sAGH/1wBi/5oAZP/XAGX/7ABm/1wAaP/DALX/7ADA/+wAwf/sAML/7ADD/+wAxP/sAMf/7ADI/+wAyf/sAMr/7ADN/9cA0P8fABgAHf9cAEb/XABV/8MAWwApAHH/XAB1/zMAhP/XAI3/hQCu/9cAr//XALD/1wCx/9cAsv/XALP/1wC1/9cAwP/sAMH/7ADC/+wAw//sAMT/7ADNACkA5/+uAOj/mgDp/6QAFAAd/5oAOP+uAEH/1wBC/3EARP+aAEX/1wBG/9cASP/DAIj/1wCO/64Aj/+uAJD/rgCR/64Akv+uAJP/rgCV/9cAp//sAKj/7ACp/+wAqv/sAAYAOP2aAHL/rgB5/+wA4f/DAOX/1wDs/8MAAQDl/8MABQBx/+wAxwApAMgAKQDJACkAygApAAMAZP+uAM3/mgDlABQAAQB1/+wAAgBy/8MAdf/XAAIAGwAOAA4AAAAVABUAAQAbABsAAgAdACEAAwAjACMACAAlACcACQAvAEgADABPAFcAJgBZAGgALwBxAHMAPwB1AHUAQgB5AHkAQwCEAIQARACJAIkARQCOAJ0ARgCgAKQAVgCnAKoAWwCuAL0AXwDAAMQAbwDHAMoAdADNAM4AeADQANAAegDhAOIAewDlAOUAfQDnAOgAfgDtAO0AgADyAPIAgQABBFQABAAAAFwAwgDgAQYBLAE6AVwBZgFsAXYBlAGeAagB0gHsAhICOAJSAmwCggKQApoCsAK6AsACxgK6AswCzALSAuQDBgMcA0YDUANeA2gDbgN0A3QDdAN0A3QDdAOOA5gDjgOOA44DjgOeA54DngOeA6gDqAOoA6gDqAOyA7IDsgOyA7gDuAO4A7gDuAO4A8oD3APKA8oDygPKA+4D7gPuA+4D/AP8A/wD/AP8BBIEEgQSBBIEGAOoBCoESAROAAcAL/9IAI7/SACP/0gAkP9IAJH/SACS/0gAk/9IAAkAL/6kADH/mgA9/4UARwApAE//XABR/0gAU/9cAF3/XABj/64ACQAv/+wAPf/XAEf/mgBn/9cAoP/XAKH/1wCi/9cAo//XAKT/1wADAC//rgA9/+wAR/+aAAgAL/7hADH/hQAz/+wAPf+FAE//CgBT/woAXf8KAGP/MwACAC//1wBH/9cAAQBDABQAAgAx/4UAZ/+FAAcAMf+NAD3/rgBD/64AR/9cAFP/1wBd/9cAZ/+uAAIAMwAUAE8AFAACAC//XABH/9cACgAx/8MAPf/DAEf/wwBP/9cArv/XAK//1wCw/9cAsf/XALL/1wCz/9cABgAv/+wAMf/sAD3/7ABD/+EAR/+FAF3/7AAJAC/+9gAx/4UAM//sAD3/cQBP/uEAU/7hAF3+4QBj/uEAZ/8KAAkAL/8KADH/rgAz/+wAPf+aAE//XABR/1wAU/9xAF3/hQBj/64ABgAv/8MAPf/XAE//1wBT/+wAXf/XAGP/7AAGADH/wwA9/9cAU//XAF3/7ABj/9cAZ/9xAAUAMf/DAD3/wwBT/9cAXf/DAGP/1wADAFf/7ABdABQAZ//XAAIAXf/XAGf/1wAFAE//hQBR/4UAU/9IAF3/SABj/8MAAgBP/+wAZ//XAAEAUwAUAAEAU//sAAEAUf/XAAEAV//sAAQAT//XAFH/1wBT/+wAXf/XAAgAT//sAFH/7ABd/+wAY//XAMf/1wDI/9cAyf/XAMr/1wAFAFH/hQBT/+wAXf/DAGP/1wBn/8MACgBDACkAT//sAFH/1wBT/+wAXf/XALT/7AC2/+wAt//sALj/7AC5/+wAAgBP/+wAXf/X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AFwAbQBhAHQAIABzAGMAaAB3AGUAaQB6AGUAcgBQAG8AcgB0AHkAcABlAFIAZQBnAHUAbABhAHIAcAB5AHIAcwA6ACAAUABvAHAAVQBQACAAUgBlAGcAdQBsAGEAcgA6ACAAUABvAHIAdAB5AHAAZQAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwADAAMAA7AFAAUwAgADAAMAAxAC4AMAAwADEAOwBoAG8AdABjAG8AbgB2ACAAMQAuADAALgA1ADYAUABvAHIAdAB5AHAAZQAtAFIAZQBnAHUAbABhAHIAUABsAGUAYQBzAGUAIAByAGUAZgBlAHIAIAB0AG8AIAB0AGgAZQAgAEMAbwBwAHkAcgBpAGcAaAB0ACAAcwBlAGMAdABpAG8AbgAgAGYAbwByACAAdABoAGUAIABmAG8AbgB0ACAAdAByAGEAZABlAG0AYQByAGsAIABhAHQAdAByAGkAYgB1AHQAaQBvAG4AIABuAG8AdABpAGMAZQBzAC4ATQBvAG4AbwBzAHAAYQBjAGUAIAAyADAAMQAyACAABABzAGMAaAB3AGUAaQB6AGUAcgBXAGUAYgBmAG8AbgB0ACAAMQAuADAARgByAGkAIABNAGEAcgAgADIANAAgADAANQA6ADQANAA6ADUAOAAgADIAMAAxADcAAAACAAAAAAAA/LIAUwAAAAAAAAAAAAAAAAAAAAAAAAAAAPQAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQABBAEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQEPARAAowCEAIUAvQCWAOgAhgCOAIsAnQCpAKQBEQCKANoAgwCTARIBEwCNAJcAiADDAN4BFACeAKoA9QD0APYAogCtAMkAxwCuAGIAYwCQAGQAywBlAMgAygDPAMwAzQDOAOkAZgDTANAA0QCvAGcA8ACRANYA1ADVAGgA6wDtAIkAagBpAGsAbQBsAG4AoABvAHEAcAByAHMAdQB0AHYAdwDqAHgAegB5AHsAfQB8ALgAoQB/AH4AgACBAOwA7gC6ALAAsQC7ANgA2QEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIAsgCzALYAtwDEALQAtQDFAIcAqwEjAL4AvwEkASUAjAEmAScBKAZnbHlwaDEGZ2x5cGgyBmdseXBoMwd1bmkwMDA5B3VuaTAwMEEHdW5pMDAwRAd1bmkwMDEwB3VuaTAwMTEHdW5pMDAxMgd1bmkwMDEzB3VuaTAwMTQHdW5pMDAxRQd1bmkwMDFGB3VuaTAwN0YHdW5pMDBBMAd1bmkwMEFEB3VuaTAwQjIHdW5pMDBCMwd1bmkwMEI5B3VuaTIwMDAHdW5pMjAwMQd1bmkyMDAyB3VuaTIwMDMHdW5pMjAwNAd1bmkyMDA1B3VuaTIwMDYHdW5pMjAwNwd1bmkyMDA4B3VuaTIwMDkHdW5pMjAwQQd1bmkyMDEwB3VuaTIwMTEKZmlndXJlZGFzaAd1bmkyMDJGB3VuaTIwNUYERXVybwd1bmkyNUZDB3VuaUZCMDEHdW5pRkIwMgC4Af+FsAGNAEuwCFBYsQEBjlmxRgYrWCGwEFlLsBRSWCGwgFkdsAYrXFgAsAMgRbADK0SwBiBFugADA/UAAiuwAytEsAUgRboABgIAAAIrsAMrRLAEIEW6AAUBaAACK7ADK0SwByBFugADBDYAAiuwAytEsAggRboABwIrAAIrsAMrRLAJIEW6AAgBZwACK7ADK0SwCiBFugAJARAAAiuwAytEsAsgRbIK5AIrsAMrRLAMIEWyCw0CK7ADK0QBsA0gRbADK0SwESBFugANAgAAAiuxA0Z2K0SwECBFugARAWgAAiuxA0Z2K0SwDyBFugAQAREAAiuxA0Z2K0SwDiBFsg+6AiuxA0Z2K0SwEiBFugANBDYAAiuxA0Z2K0SwEyBFugASAisAAiuxA0Z2K0SwFCBFugATAWcAAiuxA0Z2K0SwFSBFshQNAiuxA0Z2K0SwFiBFshXbAiuxA0Z2K0RZsBQrAAABWNTqmgAA"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,9u4AADzuAAABAAIAAAAAAAAAAAAAAAAAAAABAIQDAAAAAExQrwAAgEogAFAAAAAAAAAAABEBACAAAABA9T0CvwAAAAAAAAAAAAAAAAAAAAAAAA4AUABvAHIAVAB5AHAAZQAAAAwASQB0AGEAbABpAGMAAAAgAFYAZQByAHMAaQBvAG4AIAAwADAAMQAuADAAMAAxACAAAAAcAFAAbwByAFQAeQBwAGUAIABJAHQAYQBsAGkAYwAAAAAAAAEAAAATAQAABAAwRkZUTX38vKMAAAE8AAAAHEdERUYAJwD6AAABWAAAAB5HUE9TEITJngAAAXgAABr2R1NVQkR2THUAABxwAAAAIE9TLzK1BbIIAAAckAAAAGBjbWFwNxqNEQAAHPAAAAHyY3Z0IBB2CW4AAB7kAAAAOmZwZ21TtC+nAAAfIAAAAmVnYXNwAAAAEAAAIYgAAAAIZ2x5Zg8kukMAACGQAADAqGhlYWQNCGzhAADiOAAAADZoaGVhCkQajgAA4nAAAAAkaG10eOu5RyEAAOKUAAADzmxvY2G+xI/qAADmZAAAAeptYXhwAhECXgAA6FAAAAAgbmFtZR36PQMAAOhwAAABjHBvc3SxN/AJAADp/AAAAz9wcmVwKGAqBQAA7TwAAAD3d2ViZuqeWNQAAO40AAAABgAAAAEAAAAA1CSYugAAAADU3YjMAAAAANT6mxwAAQAAAAwAAAAWAAAAAgABAAEA8wABAAQAAAACAAAAAAABAAAACgAeACwAAURGTFQACAAEAAAAAP//AAEAAAABa2VybgAIAAAAAQAAAAEABAACAAAAFwA0DQASZhKwEuwTKBRaFJQUzhUIFX4WKhZkFp4Xehe0F+4YKBj2GSoZXhmSGegAAQw+AAQAAABgAMoA0ADWAOQA6gDwAPoBFAE2AVABfgH0AmYCgALaAwgDJgNAA3oDiAPCA/QELgR4BVoFxAZGBngGfgaoBrYG3Ab2B1QHagecB6IHsAfGB8wIFggoCG4IdAiCCIIIggiCCIIIggicCQIJNAmqCTQJNAo8CjwKPAo8Cp4KngqeCp4KngrYCtgK2AtCBqgGqAaoBqgGqAaoC6wLwgvCC8ILwgdqB2oHagdqC9wL3AvcC9wL3AvyC/IL8gvyCHQMBAZ+AAEAVP+FAAEAHf7NAAMAIP/XACX/1wAn/+wAAQAh/9cAAQAi/9cAAgAj/64AJ//DAAYAOACPAEH/7ABC/4UARP+aAGT/wwDQ/1wACAA6/+wAQP/XAI7/wwCP/8MAkP/DAJH/wwCS/8MAk//DAAYAlP+aAKD/7ACh/+wAov/sAKP/7ACk/+wACwCO/5oAj/+aAJD/mgCR/5oAkv+aAJP/mgCX/+wAmv/XAJv/1wCc/9cAnf/XAB0AMv/XADT/1wA1/5oAOv/XADv/wwA8/9cAPv/DAED/mgBB/5oAQgBSAEb/1wBS/9cAjv+uAI//rgCQ/64Akf+uAJL/rgCT/64AlP/XAJX/hQCW/9cAl//XAJj/1wCZ/9cAp//XAKj/1wCp/9cAqv/XAM7/1wAcADX/mgCO/woAj/8KAJD/CgCR/woAkv8KAJP/CgCg/9cAof/XAKL/1wCj/9cApP/XAK7/XACv/1wAsP9cALH/XACy/1wAs/9cALT/XAC2/1wAt/9cALj/XAC5/1wAwP9cAMH/XADC/1wAw/9cAMT/XAAGAJT/1wCW/9cAl//XAJj/1wCZ/9cAzv/XABYAPP/XAEj/1wCO/8MAj//DAJD/wwCR/8MAkv/DAJP/wwCU/9cAlv/XAJf/1wCY/9cAmf/XAJr+zQCb/s0Anf7NAKD/1wCh/9cAov/XAKP/1wCk/9cAzv/XAAsAlP/XAJb/1wCX/9cAmP/XAJn/1wCg/8MAof/DAKL/wwCj/8MApP/DAM7/1wAHAFj+9gCg/64Aof+uAKL/rgCj/64ApP+uAM3/wwAGAKD/1wCh/9cAov/XAKP/1wCk/9cA0P9xAA4AO//XAD7/1wCO/9cAj//XAJD/1wCR/9cAkv/XAJP/1wCUABQAlgAUAJcAFACYABQAmQAUAM4AFAADADL/7ABCACkAl//sAA4ANQApADr/1wBB/+wARv/XAJT/mgCg/+wAof/sAKL/7ACj/+wApP/sAKcAFACoABQAqQBmAKoAFAAMADr/1wCO/0gAj/9IAJD/SACR/0gAkv9IAJP/SADA/9cAwf/XAML/1wDD/9cAxP/XAA4AQf/XAEL/7ACO/8MAj//DAJD/wwCR/8MAkv/DAJP/wwCVACkAoAAUAKEAFACiABQAowAUAKQAFAASAEL/1wCO/9cAj//XAJD/1wCR/9cAkv/XAJP/1wCU/+wAlv/sAJf/7ACY/+wAmf/sAMD/7ADB/+wAwv/sAMP/7ADE/+wAzv/sADgANv+uAED/XABB/8MAQgApAGD/XABh/0gAjv6PAI/+jwCQ/o8Akf6PAJL+jwCT/o8AlP7hAJb/hQCX/4UAmP+FAJn/hQCa/64Am/+uAJz/rgCd/64AoP8fAKH/HwCi/x8Ao/8fAKT/HwCn/8MAqP/DAKn/wwCq/8MArv8zAK//MwCw/zMAsf8zALL/MwCz/zMAtP9IALb/SAC3/0gAuP9IALn/SAC6/64Au/+uALz/rgC9/64AwP9IAMH/SADC/0gAw/9IAMT/SADH/1wAyP9cAMn/XADK/1wAzf+uAM7/hQAaADL/mgA2/4UAOv+aADv/mgA8/8MAPv+uAED/mgBB/+wAQgApAEb/hQCO/5oAj/+aAJD/mgCR/5oAkv+aAJP/mgCU/64Alv+uAJf/rgCY/64Amf+uAJr/rgCb/64AnP+uAJ3/rgDO/64AIAA4/3EAjv7hAI/+4QCQ/uEAkf7hAJL+4QCT/uEAmv+uAJv/rgCc/64Anf+uAKD/1wCh/9cAov/XAKP/1wCk/9cArv+FAK//hQCw/4UAsf+FALL/hQCz/4UAtP+FALb/hQC3/4UAuP+FALn/hQDA/5oAwf+aAML/mgDD/5oAxP+aAAwAjv8zAI//MwCQ/zMAkf8zAJL/MwCT/zMArv/XAK//1wCw/9cAsf/XALL/1wCz/9cAAQCV/64ACgA7/4UAPv9cAEH/cQBG/zMArv8zAK//MwCw/zMAsf8zALL/MwCz/zMAAwBgABQAZv+aANAAUgAJALr/wwC7/8MAvP/DAL3/wwDAAD0AwQA9AMIAPQDDAD0AxAA9AAYAZv+uALQAKQC2ACkAtwAUALgAKQC5ACkAFwBU/9cAVf9xAGD/mgCu/3EAr/9xALD/cQCx/3EAsv9xALP/cQC0/zMAtv8zALf/MwC4/zMAuf8zAMD/CgDB/woAwv8KAMP/CgDE/woAx/+uAMj/rgDJ/64Ayv+uAAUAtP/XALb/1wC3/9cAuP/XALn/1wAMAEUAKQBQAD0AVP/DAFr/7ABe/+wAZv+uAK7/1wCv/9cAsP/XALH/1wCy/9cAs//XAAEAZP+aAAMAVf/sAFj/wwBc/+wABQBE/9cAWv/XAF7/7ABk/8MAZv+uAAEAXwApABIAYf/sAGIAFACu/9cAr//XALD/1wCx/9cAsv/XALP/1wC0/8MAtv/DALf/wwC4/8MAuf/DAMD/1wDB/9cAwv/XAMP/1wDE/9cABABFACkAYgAUAGUAKQBm/9cAEQBg/64Arv+aAK//mgCw/5oAsf+aALL/mgCz/5oAtP+uALb/rgC3/64AuP+uALn/rgDA/5oAwf+aAML/mgDD/5oAxP+aAAEAZv/DAAMAZQApAGb/rgCS/5oABgA4AI8AQf/sAEL/wwBE/9cAZP/DAND/MwAZADL/1wA6/9cAO/+uADz/1wBA/64AQf+uAEIAUgBS/9cAjv+uAI//rgCQ/64Akf+uAJL/rgCT/64AlP/XAJX/hQCW/9cAl//XAJj/1wCZ/9cAp//XAKj/1wCp/9cAqv/XAM7/1wAMAI7/wwCP/8MAkP/DAJH/wwCS/8MAk//DAJT/mgCg/+wAof/sAKL/7ACj/+wApP/sAB0AMv/XADT/1wA1/5oAOv/XADv/rgA8/9cAPv/DAED/rgBB/64AQgBSAEb/1wBS/9cAjv+uAI//rgCQ/64Akf+uAJL/rgCT/64AlP/XAJX/hQCW/9cAl//XAJj/1wCZ/9cAp//XAKj/1wCp/9cAqv/XAM7/1wAkADD/1wAy/9cANP/XADX/rgA6/9cAO/+uADz/1wA+/9cAP//XAED/rgBB/64AQgApAEb/1wBS/9cAjv+uAI//rgCQ/64Akf+uAJL/rgCT/64AlP/XAJX/hQCW/9cAl//XAJj/1wCZ/9cAoP+uAKH/rgCi/64Ao/+uAKT/rgCn/9cAqP/XAKn/1wCq/9cAzv/XABgAPP/XAEIAZgBI/9cAjv/DAI//wwCQ/8MAkf/DAJL/wwCT/8MAlP/XAJb/1wCX/9cAmP/XAJn/1wCa/s0Am/7NAJz+zQCd/s0AoP/XAKH/1wCi/9cAo//XAKT/1wDO/9cADgA1ACkAOv/XAED/7ABB/+wARv/XAKD/7ACh/+wAov/sAKP/7ACk/+wApwAUAKgAFACpAGYAqgAUABoAMv+aADb/hQA6/5oAO/+aADz/rgA+/64AQP/DAEH/7ABCAD0ARv+FAI7/mgCP/5oAkP+aAJH/mgCS/5oAk/+aAJT/rgCW/64Al/+uAJj/rgCZ/64Amv+uAJv/rgCc/64Anf+uAM7/rgAaADL/mgA2/4UAOv+aADv/mgA8/64APv+uAED/cQBB/+wAQgA9AEb/hQCO/5oAj/+aAJD/mgCR/5oAkv+aAJP/mgCU/64Alv+uAJf/rgCY/64Amf+uAJr/rgCb/64AnP+uAJ3/rgDO/64ABQC0ACkAtgApALcAKQC4ACkAuQApAAYAZv+uALQAKQC2ACkAtwApALgAKQC5ACkABQBE/9cAWv+uAF7/7ABk/8MAZv+uAAQARQApAGIAFABlACkAZv/DAA4ANQApADr/1wBA/+wAQf/sAEb/1wCg/+wAof/sAKL/7ACj/+wApP/sAKf/wwCo/8MAqQBmAKr/wwACABcADgAOAAAAHQAeAAEAIgAkAAMALwA0AAYANgA+AAwAQABHABUATwBQAB0AUwBVAB8AVwBXACIAWgBaACMAXABeACQAYABgACcAYwBlACgAZwBnACsAjgCdACwAoACkADwApwCqAEEArgC0AEUAtgC9AEwAwADEAFQAxwDKAFkAzQDOAF0A0ADQAF8AAQTmAAQAAAA+AIYApACqALgAzgDwARYBPAFGAUwBagGQAbIBwAH2AiACigLIAwIDEAMiAygDNgNYA9YEQARABEAEQARABEAERgRYBGIEdARiBGIEigSKBIoEigScBJwEnAScBJwEogSiBKIEogSwBLAEsASwBLAEtgS2BLYEtgS8BMIEyAAHAC/+ZgCO/mYAj/5mAJD+ZgCR/mYAkv5mAJP+ZgABAC//wwADAC//mgBH/9cA0P/XAAUAL/8KAD3/1wBP/1wAU/9cAF3/XAAIAC//mgAz/9cAjv+aAI//mgCQ/5oAkf+aAJL/mgCT/5oACQAv/4UAM//XAD3/1wCO/4UAj/+FAJD/hQCR/4UAkv+FAJP/hQAJAC//wwA9/64AZ//DAI7/wwCP/8MAkP/DAJH/wwCS/8MAk//DAAIAPf/XAEf/cQABAC//1wAHAC//1wCO/9cAj//XAJD/1wCR/9cAkv/XAJP/1wAJAC//CgAz/9cAXf/XAJT/1wCW/9cAl//XAJj/1wCZ/9cAzv/XAAgAL//DAD0AFABT/9cAtP/XALb/1wC3/9cAuP/XALn/1wADAC//wwAz/+wAXf/sAA0AL/5mADH/XAAz/4UAN/+aAD3/SABD/5oAT/8zAFP/SABX/64AXf9IAGP/XABn/64Alf9cAAoAL/8KAD3/1wBP/3EAU/+FAF3/hQBj/5oAx/+aAMj/mgDJ/5oAyv+aABoAL/8zAE//cQBT/64AV/+u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"

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _states = __webpack_require__(0);

//Require scripts
__webpack_require__(35);

// import {sendPost} from './ajaxManager'
//
// sendPost({'category': 'expositions'})
// import {Compare, CompareAll} from './states';
__webpack_require__(36);


//Store.dispatch({type:'CHANGE_LANGUAGE', lang: 'en'})
__webpack_require__(13);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(23);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(21);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(7);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(25);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(30);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(29)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(9);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
    'use strict';
    var $;

    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);
    

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',
        
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            onKeyPress: function (swiper, keyCode)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push(s.params.containerModifierClass + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function(moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing': 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;
        
            // Find slides currently in view
            if(s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if(index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }
        
            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }
        
            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css(
                            'margin-' + (s.isHorizontal() ? 'top' : 'left'),
                            (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        )
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if(prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1, i, j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            }
            else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function(){
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
            if (s.params.onAfterResize) s.params.onAfterResize(s);
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        s.touchEventsDesktop = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = {start: 'pointerdown', move: 'pointermove', end: 'pointerup'};
        else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp'};
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : s.touchEventsDesktop.start,
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button, video',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (
                        (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
                else {
                    if (
                        (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                }
                else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
        
            if (!s.params.followFinger) return;
        
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched  && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };
        

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
                        if (typeof s === 'undefined' || s === null || !s) return;
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: (function () {
                if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
                else return s.touchEvents;
            })(),
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };
        

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (Array.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };
        

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function (e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
                }
            },
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function () {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function () {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };
        

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function () {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function (key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            },
            scrollToSlide: function(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };
        

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
            s.emit('onKeyPress', s, kc);
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;
        
            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }
        
            if (!isSupported &&
                document.implementation &&
                document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                document.implementation.hasFeature('', '') !== true ) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
        
            return isSupported;
        }
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/ event ) /*object*/ {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;
        
            var sX = 0, sY = 0,       // spinX, spinY
                pX = 0, pY = 0;       // pixelX, pixelY
        
            // Legacy
            if( 'detail' in event ) {
                sY = event.detail;
            }
            if( 'wheelDelta' in event ) {
                sY = -event.wheelDelta / 120;
            }
            if( 'wheelDeltaY' in event ) {
                sY = -event.wheelDeltaY / 120;
            }
            if( 'wheelDeltaX' in event ) {
                sX = -event.wheelDeltaX / 120;
            }
        
            // side scrolling on FF with DOMMouseScroll
            if( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
                sX = sY;
                sY = 0;
            }
        
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
        
            if( 'deltaY' in event ) {
                pY = event.deltaY;
            }
            if( 'deltaX' in event ) {
                pX = event.deltaX;
            }
        
            if( (pX || pY) && event.deltaMode ) {
                if( event.deltaMode === 1 ) {          // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {                             // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }
        
            // Fall-back if spin cannot be determined
            if( pX && !sX ) {
                sX = (pX < 1) ? -1 : 1;
            }
            if( pY && !sY ) {
                sY = (pY < 1) ? -1 : 1;
            }
        
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
                'DOMMouseScroll' :
                isEventSupported() ?
                    'wheel' : 'mousewheel';
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            var data = normalizeWheel( e );
        
            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
                    else return;
                }
                else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
                    else return;
                }
            }
            else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
            }
        
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);
        
                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = false;
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };
        

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                }
                else {
                    z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function (e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;
        
                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
        
                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
        
                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() &&
                        (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                        (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                    else if (!s.isHorizontal() &&
                        (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                        (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
        
                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;
        
                if (z.image.currentX < z.image.minX) {
                    z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
                }
        
                if (z.image.currentY < z.image.minY) {
                    z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
                }
        
                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();
        
                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;
        
                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        
                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function (s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
        
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
        
                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }
        
                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                }
                else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth/2 - touchX;
                        diffY = offsetY + slideHeight/2 - touchY;
        
                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;
        
                        translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;
        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
        
                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    }
                    else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }
        
                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide){
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);
        
                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function () {
                s.zoom.attachEvents();
            },
            destroy: function () {
                s.zoom.attachEvents(true);
            }
        };
        

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };
        

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
        
            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav)  {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
            lteIE9: (function() {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            })()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })(),
    
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })(),
    
            gestures: (function () {
                return 'ongesturestart' in window;
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }
    

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            };
        }
    }
    

    window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (true)
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}

//# sourceMappingURL=maps/swiper.js.map


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('Coucou bande de putes');
$ = jQuery;
console.log($);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sammy = __webpack_require__(37);

var _sammy2 = _interopRequireDefault(_sammy);

var _ajaxManager = __webpack_require__(2);

var _states = __webpack_require__(0);

var _menu = __webpack_require__(3);

var _userInterface = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$ = jQuery;

// import {changeRubrique} from './user-interface/menu';
var baseUrl = '/portique_test_room/proj2';


var SammyApp = (0, _sammy2.default)(function () {
  this.debug = true;
  this.get('/:lang/expositions/archives/:post', function () {
    var postMessage = {
      'post_title': this.params['post'],
      'post_ID': undefined
    };

    var urlMessage = {
      'category': 'expositions',
      'rubrique': 'archives',
      'postMessage': postMessage

      //urlMessage.postMessage = postMessage;

    };console.log(postMessage);
    _states.Store.dispatch({ type: 'CHANGE_RUB', rubrique: urlMessage });
  });
  this.get('/:lang/:name/:id/', function () {
    var urlMessage = {
      'category': this.params['name'],
      'rubrique': this.params['id']
    };
    _states.Store.dispatch({ type: 'CHANGE_RUB', rubrique: urlMessage });
  });
  this.get('/:lang/:name/', function () {
    var urlMessage = {
      'category': this.params['name'],
      'rubrique': undefined
    };
    _states.Store.dispatch({ type: 'CHANGE_RUB', rubrique: urlMessage });
  });
  this.get('/:lang/', function () {
    var urlMessage = {
      'category': 'expositions',
      'rubrique': 'en-cours'
    };
    _states.Store.dispatch({ type: 'CHANGE_RUB', rubrique: urlMessage });
  });
  this.notFound = function () {
    // do something
  };
});

$(function () {
  (0, _menu.MenuInit)();

  SammyApp.run();
  (0, _userInterface.userInterfaceStart)();
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// name: sammy
// version: 0.7.6

// Sammy.js / http://sammyjs.org

(function(factory){
  // Support module loading scenarios
  if (true){
    // AMD Anonymous Module
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // No module loader (plain <script> tag) - put directly in global namespace
    jQuery.sammy = window.Sammy = factory(jQuery);
  }
})(function($){

  var Sammy,
      PATH_REPLACER = "([^\/]+)",
      PATH_NAME_MATCHER = /:([\w\d]+)/g,
      QUERY_STRING_MATCHER = /\?([^#]*)?$/,
      // mainly for making `arguments` an Array
      _makeArray = function(nonarray) { return Array.prototype.slice.call(nonarray); },
      // borrowed from jQuery
      _isFunction = function( obj ) { return Object.prototype.toString.call(obj) === "[object Function]"; },
      _isArray = function( obj ) { return Object.prototype.toString.call(obj) === "[object Array]"; },
      _isRegExp = function( obj ) { return Object.prototype.toString.call(obj) === "[object RegExp]"; },
      _decode = function( str ) { return decodeURIComponent((str || '').replace(/\+/g, ' ')); },
      _encode = encodeURIComponent,
      _escapeHTML = function(s) {
        return String(s).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      },
      _routeWrapper = function(verb) {
        return function() {
          return this.route.apply(this, [verb].concat(Array.prototype.slice.call(arguments)));
        };
      },
      _template_cache = {},
      _has_history = !!(window.history && history.pushState),
      loggers = [];


  // `Sammy` (also aliased as $.sammy) is not only the namespace for a
  // number of prototypes, its also a top level method that allows for easy
  // creation/management of `Sammy.Application` instances. There are a
  // number of different forms for `Sammy()` but each returns an instance
  // of `Sammy.Application`. When a new instance is created using
  // `Sammy` it is added to an Object called `Sammy.apps`. This
  // provides for an easy way to get at existing Sammy applications. Only one
  // instance is allowed per `element_selector` so when calling
  // `Sammy('selector')` multiple times, the first time will create
  // the application and the following times will extend the application
  // already added to that selector.
  //
  // ### Example
  //
  //      // returns the app at #main or a new app
  //      Sammy('#main')
  //
  //      // equivalent to "new Sammy.Application", except appends to apps
  //      Sammy();
  //      Sammy(function() { ... });
  //
  //      // extends the app at '#main' with function.
  //      Sammy('#main', function() { ... });
  //
  Sammy = function() {
    var args = _makeArray(arguments),
        app, selector;
    Sammy.apps = Sammy.apps || {};
    if (args.length === 0 || args[0] && _isFunction(args[0])) { // Sammy()
      return Sammy.apply(Sammy, ['body'].concat(args));
    } else if (typeof (selector = args.shift()) == 'string') { // Sammy('#main')
      app = Sammy.apps[selector] || new Sammy.Application();
      app.element_selector = selector;
      if (args.length > 0) {
        $.each(args, function(i, plugin) {
          app.use(plugin);
        });
      }
      // if the selector changes make sure the reference in Sammy.apps changes
      if (app.element_selector != selector) {
        delete Sammy.apps[selector];
      }
      Sammy.apps[app.element_selector] = app;
      return app;
    }
  };

  Sammy.VERSION = '0.7.6';

  // Add to the global logger pool. Takes a function that accepts an
  // unknown number of arguments and should print them or send them somewhere
  // The first argument is always a timestamp.
  Sammy.addLogger = function(logger) {
    loggers.push(logger);
  };

  // Sends a log message to each logger listed in the global
  // loggers pool. Can take any number of arguments.
  // Also prefixes the arguments with a timestamp.
  Sammy.log = function()  {
    var args = _makeArray(arguments);
    args.unshift("[" + Date() + "]");
    $.each(loggers, function(i, logger) {
      logger.apply(Sammy, args);
    });
  };

  if (typeof window.console != 'undefined') {
    if (typeof window.console.log === 'function' && _isFunction(window.console.log.apply)) {
      Sammy.addLogger(function() {
        window.console.log.apply(window.console, arguments);
      });
    } else {
      Sammy.addLogger(function() {
        window.console.log(arguments);
      });
    }
  } else if (typeof console != 'undefined') {
    Sammy.addLogger(function() {
      console.log.apply(console, arguments);
    });
  }

  $.extend(Sammy, {
    makeArray: _makeArray,
    isFunction: _isFunction,
    isArray: _isArray
  });

  // Sammy.Object is the base for all other Sammy classes. It provides some useful
  // functionality, including cloning, iterating, etc.
  Sammy.Object = function(obj) { // constructor
    return $.extend(this, obj || {});
  };

  $.extend(Sammy.Object.prototype, {

    // Escape HTML in string, use in templates to prevent script injection.
    // Also aliased as `h()`
    escapeHTML: _escapeHTML,
    h: _escapeHTML,

    // Returns a copy of the object with Functions removed.
    toHash: function() {
      var json = {};
      $.each(this, function(k,v) {
        if (!_isFunction(v)) {
          json[k] = v;
        }
      });
      return json;
    },

    // Renders a simple HTML version of this Objects attributes.
    // Does not render functions.
    // For example. Given this Sammy.Object:
    //
    //     var s = new Sammy.Object({first_name: 'Sammy', last_name: 'Davis Jr.'});
    //     s.toHTML()
    //     //=> '<strong>first_name</strong> Sammy<br /><strong>last_name</strong> Davis Jr.<br />'
    //
    toHTML: function() {
      var display = "";
      $.each(this, function(k, v) {
        if (!_isFunction(v)) {
          display += "<strong>" + k + "</strong> " + v + "<br />";
        }
      });
      return display;
    },

    // Returns an array of keys for this object. If `attributes_only`
    // is true will not return keys that map to a `function()`
    keys: function(attributes_only) {
      var keys = [];
      for (var property in this) {
        if (!_isFunction(this[property]) || !attributes_only) {
          keys.push(property);
        }
      }
      return keys;
    },

    // Checks if the object has a value at `key` and that the value is not empty
    has: function(key) {
      return this[key] && $.trim(this[key].toString()) !== '';
    },

    // convenience method to join as many arguments as you want
    // by the first argument - useful for making paths
    join: function() {
      var args = _makeArray(arguments);
      var delimiter = args.shift();
      return args.join(delimiter);
    },

    // Shortcut to Sammy.log
    log: function() {
      Sammy.log.apply(Sammy, arguments);
    },

    // Returns a string representation of this object.
    // if `include_functions` is true, it will also toString() the
    // methods of this object. By default only prints the attributes.
    toString: function(include_functions) {
      var s = [];
      $.each(this, function(k, v) {
        if (!_isFunction(v) || include_functions) {
          s.push('"' + k + '": ' + v.toString());
        }
      });
      return "Sammy.Object: {" + s.join(',') + "}";
    }
  });


  // Return whether the event targets this window.
  Sammy.targetIsThisWindow = function targetIsThisWindow(event, tagName) {
    var targetElement = $(event.target).closest(tagName);
    if (targetElement.length === 0) { return true; }

    var targetWindow = targetElement.attr('target');
    if (!targetWindow || targetWindow === window.name || targetWindow === '_self') { return true; }
    if (targetWindow === '_blank') { return false; }
    if (targetWindow === 'top' && window === window.top) { return true; }
    return false;
  };


  // The DefaultLocationProxy is the default location proxy for all Sammy applications.
  // A location proxy is a prototype that conforms to a simple interface. The purpose
  // of a location proxy is to notify the Sammy.Application its bound to when the location
  // or 'external state' changes.
  //
  // The `DefaultLocationProxy` watches for changes to the path of the current window and
  // is also able to set the path based on changes in the application. It does this by
  // using different methods depending on what is available in the current browser. In
  // the latest and greatest browsers it used the HTML5 History API and the `pushState`
  // `popState` events/methods. This allows you to use Sammy to serve a site behind normal
  // URI paths as opposed to the older default of hash (#) based routing. Because the server
  // can interpret the changed path on a refresh or re-entry, though, it requires additional
  // support on the server side. If you'd like to force disable HTML5 history support, please
  // use the `disable_push_state` setting on `Sammy.Application`. If pushState support
  // is enabled, `DefaultLocationProxy` also binds to all links on the page. If a link is clicked
  // that matches the current set of routes, the URL is changed using pushState instead of
  // fully setting the location and the app is notified of the change.
  //
  // If the browser does not have support for HTML5 History, `DefaultLocationProxy` automatically
  // falls back to the older hash based routing. The newest browsers (IE, Safari > 4, FF >= 3.6)
  // support a 'onhashchange' DOM event, thats fired whenever the location.hash changes.
  // In this situation the DefaultLocationProxy just binds to this event and delegates it to
  // the application. In the case of older browsers a poller is set up to track changes to the
  // hash.
  Sammy.DefaultLocationProxy = function(app, run_interval_every) {
    this.app = app;
    // set is native to false and start the poller immediately
    this.is_native = false;
    this.has_history = _has_history;
    this._startPolling(run_interval_every);
  };

  Sammy.DefaultLocationProxy.fullPath = function(location_obj) {
   // Bypass the `window.location.hash` attribute.  If a question mark
    // appears in the hash IE6 will strip it and all of the following
    // characters from `window.location.hash`.
    var matches = location_obj.toString().match(/^[^#]*(#.+)$/);
    var hash = matches ? matches[1] : '';
    return [location_obj.pathname, location_obj.search, hash].join('');
  };
$.extend(Sammy.DefaultLocationProxy.prototype , {
    // bind the proxy events to the current app.
    bind: function() {
      var proxy = this, app = this.app, lp = Sammy.DefaultLocationProxy;
      $(window).bind('hashchange.' + this.app.eventNamespace(), function(e, non_native) {
        // if we receive a native hash change event, set the proxy accordingly
        // and stop polling
        if (proxy.is_native === false && !non_native) {
          proxy.is_native = true;
          window.clearInterval(lp._interval);
          lp._interval = null;
        }
        app.trigger('location-changed');
      });
      if (_has_history && !app.disable_push_state) {
        // bind to popstate
        $(window).bind('popstate.' + this.app.eventNamespace(), function(e) {
          app.trigger('location-changed');
        });
        // bind to link clicks that have routes
        $(document).delegate('a', 'click.history-' + this.app.eventNamespace(), function (e) {
          if (e.isDefaultPrevented() || e.metaKey || e.ctrlKey) {
            return;
          }
          var full_path = lp.fullPath(this),
            // Get anchor's host name in a cross browser compatible way.
            // IE looses hostname property when setting href in JS
            // with a relative URL, e.g. a.setAttribute('href',"/whatever").
            // Circumvent this problem by creating a new link with given URL and
            // querying that for a hostname.
            hostname = this.hostname ? this.hostname : function (a) {
              var l = document.createElement("a");
              l.href = a.href;
              return l.hostname;
            }(this);

          if (hostname == window.location.hostname &&
              app.lookupRoute('get', full_path) &&
              Sammy.targetIsThisWindow(e, 'a')) {
            e.preventDefault();
            proxy.setLocation(full_path);
            return false;
          }
        });
      }
      if (!lp._bindings) {
        lp._bindings = 0;
      }
      lp._bindings++;
    },

    // unbind the proxy events from the current app
    unbind: function() {
      $(window).unbind('hashchange.' + this.app.eventNamespace());
      $(window).unbind('popstate.' + this.app.eventNamespace());
      $(document).undelegate('a', 'click.history-' + this.app.eventNamespace());
      Sammy.DefaultLocationProxy._bindings--;
      if (Sammy.DefaultLocationProxy._bindings <= 0) {
        window.clearInterval(Sammy.DefaultLocationProxy._interval);
        Sammy.DefaultLocationProxy._interval = null;
      }
    },

    // get the current location from the hash.
    getLocation: function() {
      return Sammy.DefaultLocationProxy.fullPath(window.location);
    },

    // set the current location to `new_location`
    setLocation: function(new_location) {
      if (/^([^#\/]|$)/.test(new_location)) { // non-prefixed url
        if (_has_history && !this.app.disable_push_state) {
          new_location = '/' + new_location;
        } else {
          new_location = '#!/' + new_location;
        }
      }
      if (new_location != this.getLocation()) {
        // HTML5 History exists and new_location is a full path
        if (_has_history && !this.app.disable_push_state && /^\//.test(new_location)) {
          history.pushState({ path: new_location }, window.title, new_location);
          this.app.trigger('location-changed');
        } else {
          return (window.location = new_location);
        }
      }
    },

    _startPolling: function(every) {
      // set up interval
      var proxy = this;
      if (!Sammy.DefaultLocationProxy._interval) {
        if (!every) { every = 10; }
        var hashCheck = function() {
          var current_location = proxy.getLocation();
          if (typeof Sammy.DefaultLocationProxy._last_location == 'undefined' ||
            current_location != Sammy.DefaultLocationProxy._last_location) {
            window.setTimeout(function() {
              $(window).trigger('hashchange', [true]);
            }, 0);
          }
          Sammy.DefaultLocationProxy._last_location = current_location;
        };
        hashCheck();
        Sammy.DefaultLocationProxy._interval = window.setInterval(hashCheck, every);
      }
    }
  });


  // Sammy.Application is the Base prototype for defining 'applications'.
  // An 'application' is a collection of 'routes' and bound events that is
  // attached to an element when `run()` is called.
  // The only argument an 'app_function' is evaluated within the context of the application.
  Sammy.Application = function(app_function) {
    var app = this;
    this.routes            = {};
    this.listeners         = new Sammy.Object({});
    this.arounds           = [];
    this.befores           = [];
    // generate a unique namespace
    this.namespace         = (new Date()).getTime() + '-' + parseInt(Math.random() * 1000, 10);
    this.context_prototype = function() { Sammy.EventContext.apply(this, arguments); };
    this.context_prototype.prototype = new Sammy.EventContext();

    if (_isFunction(app_function)) {
      app_function.apply(this, [this]);
    }
    // set the location proxy if not defined to the default (DefaultLocationProxy)
    if (!this._location_proxy) {
      this.setLocationProxy(new Sammy.DefaultLocationProxy(this, this.run_interval_every));
    }
    if (this.debug) {
      this.bindToAllEvents(function(e, data) {
        app.log(app.toString(), e.cleaned_type, data || {});
      });
    }
  };

  Sammy.Application.prototype = $.extend({}, Sammy.Object.prototype, {

    // the four route verbs
    ROUTE_VERBS: ['get','post','put','delete'],

    // An array of the default events triggered by the
    // application during its lifecycle
    APP_EVENTS: ['run', 'unload', 'lookup-route', 'run-route', 'route-found', 'event-context-before', 'event-context-after', 'changed', 'error', 'check-form-submission', 'redirect', 'location-changed'],

    _last_route: null,
    _location_proxy: null,
    _running: false,

    // Defines what element the application is bound to. Provide a selector
    // (parseable by `jQuery()`) and this will be used by `$element()`
    element_selector: 'body',

    // When set to true, logs all of the default events using `log()`
    debug: false,

    // When set to true, and the error() handler is not overridden, will actually
    // raise JS errors in routes (500) and when routes can't be found (404)
    raise_errors: false,

    // The time in milliseconds that the URL is queried for changes
    run_interval_every: 50,

    // if using the `DefaultLocationProxy` setting this to true will force the app to use
    // traditional hash based routing as opposed to the new HTML5 PushState support
    disable_push_state: false,

    // The default template engine to use when using `partial()` in an
    // `EventContext`. `template_engine` can either be a string that
    // corresponds to the name of a method/helper on EventContext or it can be a function
    // that takes two arguments, the content of the unrendered partial and an optional
    // JS object that contains interpolation data. Template engine is only called/referred
    // to if the extension of the partial is null or unknown. See `partial()`
    // for more information
    template_engine: null,

    // //=> Sammy.Application: body
    toString: function() {
      return 'Sammy.Application:' + this.element_selector;
    },

    // returns a jQuery object of the Applications bound element.
    $element: function(selector) {
      return selector ? $(this.element_selector).find(selector) : $(this.element_selector);
    },

    // `use()` is the entry point for including Sammy plugins.
    // The first argument to use should be a function() that is evaluated
    // in the context of the current application, just like the `app_function`
    // argument to the `Sammy.Application` constructor.
    //
    // Any additional arguments are passed to the app function sequentially.
    //
    // For much more detail about plugins, check out:
    // [http://sammyjs.org/docs/plugins](http://sammyjs.org/docs/plugins)
    //
    // ### Example
    //
    //      var MyPlugin = function(app, prepend) {
    //
    //        this.helpers({
    //          myhelper: function(text) {
    //            alert(prepend + " " + text);
    //          }
    //        });
    //
    //      };
    //
    //      var app = $.sammy(function() {
    //
    //        this.use(MyPlugin, 'This is my plugin');
    //
    //        this.get('#/', function() {
    //          this.myhelper('and dont you forget it!');
    //          //=> Alerts: This is my plugin and dont you forget it!
    //        });
    //
    //      });
    //
    // If plugin is passed as a string it assumes your are trying to load
    // Sammy."Plugin". This is the preferred way of loading core Sammy plugins
    // as it allows for better error-messaging.
    //
    // ### Example
    //
    //      $.sammy(function() {
    //        this.use('Mustache'); //=> Sammy.Mustache
    //        this.use('Storage'); //=> Sammy.Storage
    //      });
    //
    use: function() {
      // flatten the arguments
      var args = _makeArray(arguments),
          plugin = args.shift(),
          plugin_name = plugin || '';
      try {
        args.unshift(this);
        if (typeof plugin == 'string') {
          plugin_name = 'Sammy.' + plugin;
          plugin = Sammy[plugin];
        }
        plugin.apply(this, args);
      } catch(e) {
        if (typeof plugin === 'undefined') {
          this.error("Plugin Error: called use() but plugin (" + plugin_name.toString() + ") is not defined", e);
        } else if (!_isFunction(plugin)) {
          this.error("Plugin Error: called use() but '" + plugin_name.toString() + "' is not a function", e);
        } else {
          this.error("Plugin Error", e);
        }
      }
      return this;
    },

    // Sets the location proxy for the current app. By default this is set to
    // a new `Sammy.DefaultLocationProxy` on initialization. However, you can set
    // the location_proxy inside you're app function to give your app a custom
    // location mechanism. See `Sammy.DefaultLocationProxy` and `Sammy.DataLocationProxy`
    // for examples.
    //
    // `setLocationProxy()` takes an initialized location proxy.
    //
    // ### Example
    //
    //        // to bind to data instead of the default hash;
    //        var app = $.sammy(function() {
    //          this.setLocationProxy(new Sammy.DataLocationProxy(this));
    //        });
    //
    setLocationProxy: function(new_proxy) {
      var original_proxy = this._location_proxy;
      this._location_proxy = new_proxy;
      if (this.isRunning()) {
        if (original_proxy) {
          // if there is already a location proxy, unbind it.
          original_proxy.unbind();
        }
        this._location_proxy.bind();
      }
    },

    // provide log() override for inside an app that includes the relevant application element_selector
    log: function() {
      Sammy.log.apply(Sammy, Array.prototype.concat.apply([this.element_selector],arguments));
    },


    // `route()` is the main method for defining routes within an application.
    // For great detail on routes, check out:
    // [http://sammyjs.org/docs/routes](http://sammyjs.org/docs/routes)
    //
    // This method also has aliases for each of the different verbs (eg. `get()`, `post()`, etc.)
    //
    // ### Arguments
    //
    // * `verb` A String in the set of ROUTE_VERBS or 'any'. 'any' will add routes for each
    //    of the ROUTE_VERBS. If only two arguments are passed,
    //    the first argument is the path, the second is the callback and the verb
    //    is assumed to be 'any'.
    // * `path` A Regexp or a String representing the path to match to invoke this verb.
    // * `callback` A Function that is called/evaluated when the route is run see: `runRoute()`.
    //    It is also possible to pass a string as the callback, which is looked up as the name
    //    of a method on the application.
    //
    route: function(verb, path) {
      var app = this, param_names = [], add_route, path_match, callback = Array.prototype.slice.call(arguments,2);

      // if the method signature is just (path, callback)
      // assume the verb is 'any'
      if (callback.length === 0 && _isFunction(path)) {
        callback = [path];
        path = verb;
        verb = 'any';
      }

      verb = verb.toLowerCase(); // ensure verb is lower case

      // if path is a string turn it into a regex
      if (path.constructor == String) {

        // Needs to be explicitly set because IE will maintain the index unless NULL is returned,
        // which means that with two consecutive routes that contain params, the second set of params will not be found and end up in splat instead of params
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/RegExp/lastIndex
        PATH_NAME_MATCHER.lastIndex = 0;

        // find the names
        while ((path_match = PATH_NAME_MATCHER.exec(path)) !== null) {
          param_names.push(path_match[1]);
        }
        // replace with the path replacement
        path = new RegExp(path.replace(PATH_NAME_MATCHER, PATH_REPLACER) + "$");
      }
      // lookup callbacks
      $.each(callback,function(i,cb){
        if (typeof(cb) === 'string') {
          callback[i] = app[cb];
        }
      });

      add_route = function(with_verb) {
        var r = {verb: with_verb, path: path, callback: callback, param_names: param_names};
        // add route to routes array
        app.routes[with_verb] = app.routes[with_verb] || [];
        // place routes in order of definition
        app.routes[with_verb].push(r);
      };

      if (verb === 'any') {
        $.each(this.ROUTE_VERBS, function(i, v) { add_route(v); });
      } else {
        add_route(verb);
      }

      // return the app
      return this;
    },

    // Alias for route('get', ...)
    get: _routeWrapper('get'),

    // Alias for route('post', ...)
    post: _routeWrapper('post'),

    // Alias for route('put', ...)
    put: _routeWrapper('put'),

    // Alias for route('delete', ...)
    del: _routeWrapper('delete'),

    // Alias for route('any', ...)
    any: _routeWrapper('any'),

    // `mapRoutes` takes an array of arrays, each array being passed to route()
    // as arguments, this allows for mass definition of routes. Another benefit is
    // this makes it possible/easier to load routes via remote JSON.
    //
    // ### Example
    //
    //      var app = $.sammy(function() {
    //
    //        this.mapRoutes([
    //            ['get', '#/', function() { this.log('index'); }],
    //            // strings in callbacks are looked up as methods on the app
    //            ['post', '#/create', 'addUser'],
    //            // No verb assumes 'any' as the verb
    //            [/dowhatever/, function() { this.log(this.verb, this.path)}];
    //          ]);
    //      });
    //
    mapRoutes: function(route_array) {
      var app = this;
      $.each(route_array, function(i, route_args) {
        app.route.apply(app, route_args);
      });
      return this;
    },

    // A unique event namespace defined per application.
    // All events bound with `bind()` are automatically bound within this space.
    eventNamespace: function() {
      return ['sammy-app', this.namespace].join('-');
    },

    // Works just like `jQuery.fn.bind()` with a couple notable differences.
    //
    // * It binds all events to the application element
    // * All events are bound within the `eventNamespace()`
    // * Events are not actually bound until the application is started with `run()`
    // * callbacks are evaluated within the context of a Sammy.EventContext
    //
    bind: function(name, data, callback) {
      var app = this;
      // build the callback
      // if the arity is 2, callback is the second argument
      if (typeof callback == 'undefined') { callback = data; }
      var listener_callback =  function() {
        // pull off the context from the arguments to the callback
        var e, context, data;
        e       = arguments[0];
        data    = arguments[1];
        if (data && data.context) {
          context = data.context;
          delete data.context;
        } else {
          context = new app.context_prototype(app, 'bind', e.type, data, e.target);
        }
        e.cleaned_type = e.type.replace(app.eventNamespace(), '');
        callback.apply(context, [e, data]);
      };

      // it could be that the app element doesnt exist yet
      // so attach to the listeners array and then run()
      // will actually bind the event.
      if (!this.listeners[name]) { this.listeners[name] = []; }
      this.listeners[name].push(listener_callback);
      if (this.isRunning()) {
        // if the app is running
        // *actually* bind the event to the app element
        this._listen(name, listener_callback);
      }
      return this;
    },

    // Triggers custom events defined with `bind()`
    //
    // ### Arguments
    //
    // * `name` The name of the event. Automatically prefixed with the `eventNamespace()`
    // * `data` An optional Object that can be passed to the bound callback.
    // * `context` An optional context/Object in which to execute the bound callback.
    //   If no context is supplied a the context is a new `Sammy.EventContext`
    //
    trigger: function(name, data) {
      this.$element().trigger([name, this.eventNamespace()].join('.'), [data]);
      return this;
    },

    // Reruns the current route
    refresh: function() {
      this.last_location = null;
      this.trigger('location-changed');
      return this;
    },

    // Takes a single callback that is pushed on to a stack.
    // Before any route is run, the callbacks are evaluated in order within
    // the current `Sammy.EventContext`
    //
    // If any of the callbacks explicitly return false, execution of any
    // further callbacks and the route itself is halted.
    //
    // You can also provide a set of options that will define when to run this
    // before based on the route it proceeds.
    //
    // ### Example
    //
    //      var app = $.sammy(function() {
    //
    //        // will run at #/route but not at #/
    //        this.before('#/route', function() {
    //          //...
    //        });
    //
    //        // will run at #/ but not at #/route
    //        this.before({except: {path: '#/route'}}, function() {
    //          this.log('not before #/route');
    //        });
    //
    //        this.get('#/', function() {});
    //
    //        this.get('#/route', function() {});
    //
    //      });
    //
    // See `contextMatchesOptions()` for a full list of supported options
    //
    before: function(options, callback) {
      if (_isFunction(options)) {
        callback = options;
        options = {};
      }
      this.befores.push([options, callback]);
      return this;
    },

    // A shortcut for binding a callback to be run after a route is executed.
    // After callbacks have no guarunteed order.
    after: function(callback) {
      return this.bind('event-context-after', callback);
    },


    // Adds an around filter to the application. around filters are functions
    // that take a single argument `callback` which is the entire route
    // execution path wrapped up in a closure. This means you can decide whether
    // or not to proceed with execution by not invoking `callback` or,
    // more usefully wrapping callback inside the result of an asynchronous execution.
    //
    // ### Example
    //
    // The most common use case for around() is calling a _possibly_ async function
    // and executing the route within the functions callback:
    //
    //      var app = $.sammy(function() {
    //
    //        var current_user = false;
    //
    //        function checkLoggedIn(callback) {
    //          // /session returns a JSON representation of the logged in user
    //          // or an empty object
    //          if (!current_user) {
    //            $.getJSON('/session', function(json) {
    //              if (json.login) {
    //                // show the user as logged in
    //                current_user = json;
    //                // execute the route path
    //                callback();
    //              } else {
    //                // show the user as not logged in
    //                current_user = false;
    //                // the context of aroundFilters is an EventContext
    //                this.redirect('#/login');
    //              }
    //            });
    //          } else {
    //            // execute the route path
    //            callback();
    //          }
    //        };
    //
    //        this.around(checkLoggedIn);
    //
    //      });
    //
    around: function(callback) {
      this.arounds.push(callback);
      return this;
    },

    // Adds a onComplete function to the application. onComplete functions are executed
    // at the end of a chain of route callbacks, if they call next(). Unlike after,
    // which is called as soon as the route is complete, onComplete is like a final next()
    // for all routes, and is thus run asynchronously
    //
    // ### Example
    //
    //      app.get('/chain',function(context,next) {
    //          console.log('chain1');
    //          next();
    //      },function(context,next) {
    //          console.log('chain2');
    //          next();
    //      });
    //
    //      app.get('/link',function(context,next) {
    //          console.log('link1');
    //          next();
    //      },function(context,next) {
    //          console.log('link2');
    //          next();
    //      });
    //
    //      app.onComplete(function() {
    //          console.log("Running finally");
    //      });
    //
    // If you go to '/chain', you will get the following messages:
    //
    //      chain1
    //      chain2
    //      Running onComplete
    //
    //
    // If you go to /link, you will get the following messages:
    //
    //      link1
    //      link2
    //      Running onComplete
    //
    //
    // It really comes to play when doing asynchronous:
    //
    //      app.get('/chain',function(context,next) {
    //        $.get('/my/url',function() {
    //          console.log('chain1');
    //          next();
    //        });
    //      },function(context,next) {
    //        console.log('chain2');
    //        next();
    //      });
    //
    onComplete: function(callback) {
      this._onComplete = callback;
      return this;
    },

    // Returns `true` if the current application is running.
    isRunning: function() {
      return this._running;
    },

    // Helpers extends the EventContext prototype specific to this app.
    // This allows you to define app specific helper functions that can be used
    // whenever you're inside of an event context (templates, routes, bind).
    //
    // ### Example
    //
    //     var app = $.sammy(function() {
    //
    //       helpers({
    //         upcase: function(text) {
    //          return text.toString().toUpperCase();
    //         }
    //       });
    //
    //       get('#/', function() { with(this) {
    //         // inside of this context I can use the helpers
    //         $('#main').html(upcase($('#main').text());
    //       }});
    //
    //     });
    //
    //
    // ### Arguments
    //
    // * `extensions` An object collection of functions to extend the context.
    //
    helpers: function(extensions) {
      $.extend(this.context_prototype.prototype, extensions);
      return this;
    },

    // Helper extends the event context just like `helpers()` but does it
    // a single method at a time. This is especially useful for dynamically named
    // helpers
    //
    // ### Example
    //
    //     // Trivial example that adds 3 helper methods to the context dynamically
    //     var app = $.sammy(function(app) {
    //
    //       $.each([1,2,3], function(i, num) {
    //         app.helper('helper' + num, function() {
    //           this.log("I'm helper number " + num);
    //         });
    //       });
    //
    //       this.get('#/', function() {
    //         this.helper2(); //=> I'm helper number 2
    //       });
    //     });
    //
    // ### Arguments
    //
    // * `name` The name of the method
    // * `method` The function to be added to the prototype at `name`
    //
    helper: function(name, method) {
      this.context_prototype.prototype[name] = method;
      return this;
    },

    // Actually starts the application's lifecycle. `run()` should be invoked
    // within a document.ready block to ensure the DOM exists before binding events, etc.
    //
    // ### Example
    //
    //     var app = $.sammy(function() { ... }); // your application
    //     $(function() { // document.ready
    //        app.run();
    //     });
    //
    // ### Arguments
    //
    // * `start_url` Optionally, a String can be passed which the App will redirect to
    //   after the events/routes have been bound.
    run: function(start_url) {
      if (this.isRunning()) { return false; }
      var app = this;

      // actually bind all the listeners
      $.each(this.listeners.toHash(), function(name, callbacks) {
        $.each(callbacks, function(i, listener_callback) {
          app._listen(name, listener_callback);
        });
      });

      this.trigger('run', {start_url: start_url});
      this._running = true;
      // set last location
      this.last_location = null;
      if (!(/\#(.+)/.test(this.getLocation())) && typeof start_url != 'undefined') {
        this.setLocation(start_url);
      }
      // check url
      this._checkLocation();
      this._location_proxy.bind();
      this.bind('location-changed', function() {
        app._checkLocation();
      });

      // bind to submit to capture post/put/delete routes
      this.bind('submit', function(e) {
        if ( !Sammy.targetIsThisWindow(e, 'form') ) { return true; }
        var returned = app._checkFormSubmission($(e.target).closest('form'));
        return (returned === false) ? e.preventDefault() : false;
      });

      // bind unload to body unload
      $(window).bind('unload', function() {
        app.unload();
      });

      // trigger html changed
      return this.trigger('changed');
    },

    // The opposite of `run()`, un-binds all event listeners and intervals
    // `run()` Automatically binds a `onunload` event to run this when
    // the document is closed.
    unload: function() {
      if (!this.isRunning()) { return false; }
      var app = this;
      this.trigger('unload');
      // clear interval
      this._location_proxy.unbind();
      // unbind form submits
      this.$element().unbind('submit').removeClass(app.eventNamespace());
      // unbind all events
      $.each(this.listeners.toHash() , function(name, listeners) {
        $.each(listeners, function(i, listener_callback) {
          app._unlisten(name, listener_callback);
        });
      });
      this._running = false;
      return this;
    },

    // Not only runs `unbind` but also destroys the app reference.
    destroy: function() {
      this.unload();
      delete Sammy.apps[this.element_selector];
      return this;
    },

    // Will bind a single callback function to every event that is already
    // being listened to in the app. This includes all the `APP_EVENTS`
    // as well as any custom events defined with `bind()`.
    //
    // Used internally for debug logging.
    bindToAllEvents: function(callback) {
      var app = this;
      // bind to the APP_EVENTS first
      $.each(this.APP_EVENTS, function(i, e) {
        app.bind(e, callback);
      });
      // next, bind to listener names (only if they dont exist in APP_EVENTS)
      $.each(this.listeners.keys(true), function(i, name) {
        if ($.inArray(name, app.APP_EVENTS) == -1) {
          app.bind(name, callback);
        }
      });
      return this;
    },

    // Returns a copy of the given path with any query string after the hash
    // removed.
    routablePath: function(path) {
      return path.replace(QUERY_STRING_MATCHER, '');
    },

    // Given a verb and a String path, will return either a route object or false
    // if a matching route can be found within the current defined set.
    lookupRoute: function(verb, path) {
      var app = this, routed = false, i = 0, l, route;
      if (typeof this.routes[verb] != 'undefined') {
        l = this.routes[verb].length;
        for (; i < l; i++) {
          route = this.routes[verb][i];
          if (app.routablePath(path).match(route.path)) {
            routed = route;
            break;
          }
        }
      }
      return routed;
    },

    // First, invokes `lookupRoute()` and if a route is found, parses the
    // possible URL params and then invokes the route's callback within a new
    // `Sammy.EventContext`. If the route can not be found, it calls
    // `notFound()`. If `raise_errors` is set to `true` and
    // the `error()` has not been overridden, it will throw an actual JS
    // error.
    //
    // You probably will never have to call this directly.
    //
    // ### Arguments
    //
    // * `verb` A String for the verb.
    // * `path` A String path to lookup.
    // * `params` An Object of Params pulled from the URI or passed directly.
    //
    // ### Returns
    //
    // Either returns the value returned by the route callback or raises a 404 Not Found error.
    //
    runRoute: function(verb, path, params, target) {
      var app = this,
          route = this.lookupRoute(verb, path),
          context,
          wrapped_route,
          arounds,
          around,
          befores,
          before,
          callback_args,
          path_params,
          final_returned;

      if (this.debug) {
        this.log('runRoute', [verb, path].join(' '));
      }

      this.trigger('run-route', {verb: verb, path: path, params: params});
      if (typeof params == 'undefined') { params = {}; }

      $.extend(params, this._parseQueryString(path));

      if (route) {
        this.trigger('route-found', {route: route});
        // pull out the params from the path
        if ((path_params = route.path.exec(this.routablePath(path))) !== null) {
          // first match is the full path
          path_params.shift();
          // for each of the matches
          $.each(path_params, function(i, param) {
            // if theres a matching param name
            if (route.param_names[i]) {
              // set the name to the match
              params[route.param_names[i]] = _decode(param);
            } else {
              // initialize 'splat'
              if (!params.splat) { params.splat = []; }
              params.splat.push(_decode(param));
            }
          });
        }

        // set event context
        context  = new this.context_prototype(this, verb, path, params, target);
        // ensure arrays
        arounds = this.arounds.slice(0);
        befores = this.befores.slice(0);
        // set the callback args to the context + contents of the splat
        callback_args = [context];
        if (params.splat) {
          callback_args = callback_args.concat(params.splat);
        }
        // wrap the route up with the before filters
        wrapped_route = function() {
          var returned, i, nextRoute;
          while (befores.length > 0) {
            before = befores.shift();
            // check the options
            if (app.contextMatchesOptions(context, before[0])) {
              returned = before[1].apply(context, [context]);
              if (returned === false) { return false; }
            }
          }
          app.last_route = route;
          context.trigger('event-context-before', {context: context});
          // run multiple callbacks
          if (typeof(route.callback) === "function") {
            route.callback = [route.callback];
          }
          if (route.callback && route.callback.length) {
            i = -1;
            nextRoute = function() {
              i++;
              if (route.callback[i]) {
                returned = route.callback[i].apply(context,callback_args);
              } else if (app._onComplete && typeof(app._onComplete === "function")) {
                app._onComplete(context);
              }
            };
            callback_args.push(nextRoute);
            nextRoute();
          }
          context.trigger('event-context-after', {context: context});
          return returned;
        };
        $.each(arounds.reverse(), function(i, around) {
          var last_wrapped_route = wrapped_route;
          wrapped_route = function() { return around.apply(context, [last_wrapped_route]); };
        });
        try {
          final_returned = wrapped_route();
        } catch(e) {
          this.error(['500 Error', verb, path].join(' '), e);
        }
        return final_returned;
      } else {
        return this.notFound(verb, path);
      }
    },

    // Matches an object of options against an `EventContext` like object that
    // contains `path` and `verb` attributes. Internally Sammy uses this
    // for matching `before()` filters against specific options. You can set the
    // object to _only_ match certain paths or verbs, or match all paths or verbs _except_
    // those that match the options.
    //
    // ### Example
    //
    //     var app = $.sammy(),
    //         context = {verb: 'get', path: '#/mypath'};
    //
    //     // match against a path string
    //     app.contextMatchesOptions(context, '#/mypath'); //=> true
    //     app.contextMatchesOptions(context, '#/otherpath'); //=> false
    //     // equivalent to
    //     app.contextMatchesOptions(context, {only: {path:'#/mypath'}}); //=> true
    //     app.contextMatchesOptions(context, {only: {path:'#/otherpath'}}); //=> false
    //     // match against a path regexp
    //     app.contextMatchesOptions(context, /path/); //=> true
    //     app.contextMatchesOptions(context, /^path/); //=> false
    //     // match only a verb
    //     app.contextMatchesOptions(context, {only: {verb:'get'}}); //=> true
    //     app.contextMatchesOptions(context, {only: {verb:'post'}}); //=> false
    //     // match all except a verb
    //     app.contextMatchesOptions(context, {except: {verb:'post'}}); //=> true
    //     app.contextMatchesOptions(context, {except: {verb:'get'}}); //=> false
    //     // match all except a path
    //     app.contextMatchesOptions(context, {except: {path:'#/otherpath'}}); //=> true
    //     app.contextMatchesOptions(context, {except: {path:'#/mypath'}}); //=> false
    //     // match all except a verb and a path
    //     app.contextMatchesOptions(context, {except: {path:'#/otherpath', verb:'post'}}); //=> true
    //     app.contextMatchesOptions(context, {except: {path:'#/mypath', verb:'post'}}); //=> true
    //     app.contextMatchesOptions(context, {except: {path:'#/mypath', verb:'get'}}); //=> false
    //     // match multiple paths
    //     app.contextMatchesOptions(context, {path: ['#/mypath', '#/otherpath']}); //=> true
    //     app.contextMatchesOptions(context, {path: ['#/otherpath', '#/thirdpath']}); //=> false
    //     // equivalent to
    //     app.contextMatchesOptions(context, {only: {path: ['#/mypath', '#/otherpath']}}); //=> true
    //     app.contextMatchesOptions(context, {only: {path: ['#/otherpath', '#/thirdpath']}}); //=> false
    //     // match all except multiple paths
    //     app.contextMatchesOptions(context, {except: {path: ['#/mypath', '#/otherpath']}}); //=> false
    //     app.contextMatchesOptions(context, {except: {path: ['#/otherpath', '#/thirdpath']}}); //=> true
    //     // match all except multiple paths and verbs
    //     app.contextMatchesOptions(context, {except: {path: ['#/mypath', '#/otherpath'], verb: ['get', 'post']}}); //=> false
    //     app.contextMatchesOptions(context, {except: {path: ['#/otherpath', '#/thirdpath'], verb: ['get', 'post']}}); //=> true
    //
    contextMatchesOptions: function(context, match_options, positive) {
      var options = match_options;
      // normalize options
      if (typeof options === 'string' || _isRegExp(options)) {
        options = {path: options};
      }
      if (typeof positive === 'undefined') {
        positive = true;
      }
      // empty options always match
      if ($.isEmptyObject(options)) {
        return true;
      }
      // Do we have to match against multiple paths?
      if (_isArray(options.path)){
        var results, numopt, opts, len;
        results = [];
        for (numopt = 0, len = options.path.length; numopt < len; numopt += 1) {
          opts = $.extend({}, options, {path: options.path[numopt]});
          results.push(this.contextMatchesOptions(context, opts));
        }
        var matched = $.inArray(true, results) > -1 ? true : false;
        return positive ? matched : !matched;
      }
      if (options.only) {
        return this.contextMatchesOptions(context, options.only, true);
      } else if (options.except) {
        return this.contextMatchesOptions(context, options.except, false);
      }
      var path_matched = true, verb_matched = true;
      if (options.path) {
        if (!_isRegExp(options.path)) {
          options.path = new RegExp(options.path.toString() + '$');
        }
        path_matched = options.path.test(context.path);
      }
      if (options.verb) {
        if(typeof options.verb === 'string') {
          verb_matched = options.verb === context.verb;
        } else {
          verb_matched = options.verb.indexOf(context.verb) > -1;
        }
      }
      return positive ? (verb_matched && path_matched) : !(verb_matched && path_matched);
    },


    // Delegates to the `location_proxy` to get the current location.
    // See `Sammy.DefaultLocationProxy` for more info on location proxies.
    getLocation: function() {
      return this._location_proxy.getLocation();
    },

    // Delegates to the `location_proxy` to set the current location.
    // See `Sammy.DefaultLocationProxy` for more info on location proxies.
    //
    // ### Arguments
    //
    // * `new_location` A new location string (e.g. '#/')
    //
    setLocation: function(new_location) {
      return this._location_proxy.setLocation(new_location);
    },

    // Swaps the content of `$element()` with `content`
    // You can override this method to provide an alternate swap behavior
    // for `EventContext.partial()`.
    //
    // ### Example
    //
    //      var app = $.sammy(function() {
    //
    //        // implements a 'fade out'/'fade in'
    //        this.swap = function(content, callback) {
    //          var context = this;
    //          context.$element().fadeOut('slow', function() {
    //            context.$element().html(content);
    //            context.$element().fadeIn('slow', function() {
    //              if (callback) {
    //                callback.apply();
    //              }
    //            });
    //          });
    //        };
    //
    //      });
    //
    swap: function(content, callback) {
      var $el = this.$element().html(content);
      if (_isFunction(callback)) { callback(content); }
      return $el;
    },

    // a simple global cache for templates. Uses the same semantics as
    // `Sammy.Cache` and `Sammy.Storage` so can easily be replaced with
    // a persistent storage that lasts beyond the current request.
    templateCache: function(key, value) {
      if (typeof value != 'undefined') {
        return _template_cache[key] = value;
      } else {
        return _template_cache[key];
      }
    },

    // clear the templateCache
    clearTemplateCache: function() {
      return (_template_cache = {});
    },

    // This throws a '404 Not Found' error by invoking `error()`.
    // Override this method or `error()` to provide custom
    // 404 behavior (i.e redirecting to / or showing a warning)
    notFound: function(verb, path) {
      var ret = this.error(['404 Not Found', verb, path].join(' '));
      return (verb === 'get') ? ret : true;
    },

    // The base error handler takes a string `message` and an `Error`
    // object. If `raise_errors` is set to `true` on the app level,
    // this will re-throw the error to the browser. Otherwise it will send the error
    // to `log()`. Override this method to provide custom error handling
    // e.g logging to a server side component or displaying some feedback to the
    // user.
    error: function(message, original_error) {
      if (!original_error) { original_error = new Error(); }
      original_error.message = [message, original_error.message].join(' ');
      this.trigger('error', {message: original_error.message, error: original_error});
      if (this.raise_errors) {
        throw(original_error);
      } else {
        this.log(original_error.message, original_error);
      }
    },

    _checkLocation: function() {
      var location, returned;
      // get current location
      location = this.getLocation();
      // compare to see if hash has changed
      if (!this.last_location || this.last_location[0] != 'get' || this.last_location[1] != location) {
        // reset last location
        this.last_location = ['get', location];
        // lookup route for current hash
        returned = this.runRoute('get', location);
      }
      return returned;
    },

    _getFormVerb: function(form) {
      var $form = $(form), verb, $_method;
      $_method = $form.find('input[name="_method"]');
      if ($_method.length > 0) { verb = $_method.val(); }
      if (!verb) { verb = $form[0].getAttribute('method'); }
      if (!verb || verb === '') { verb = 'get'; }
      return $.trim(verb.toString().toLowerCase());
    },

    _checkFormSubmission: function(form) {
      var $form, path, verb, params, returned;
      this.trigger('check-form-submission', {form: form});
      $form = $(form);
      path  = $form.attr('action') || '';
      verb  = this._getFormVerb($form);

      if (this.debug) {
        this.log('_checkFormSubmission', $form, path, verb);
      }

      if (verb === 'get') {
        params = this._serializeFormParams($form);
        if (params !== '') { path += '?' + params; }
        this.setLocation(path);
        returned = false;
      } else {
        params = $.extend({}, this._parseFormParams($form));
        returned = this.runRoute(verb, path, params, form.get(0));
      }
      return (typeof returned == 'undefined') ? false : returned;
    },

    _serializeFormParams: function($form) {
       var queryString = "",
         fields = $form.serializeArray(),
         i;
       if (fields.length > 0) {
         queryString = this._encodeFormPair(fields[0].name, fields[0].value);
         for (i = 1; i < fields.length; i++) {
           queryString = queryString + "&" + this._encodeFormPair(fields[i].name, fields[i].value);
         }
       }
       return queryString;
    },

    _encodeFormPair: function(name, value){
      return _encode(name) + "=" + _encode(value);
    },

    _parseFormParams: function($form) {
      var params = {},
          form_fields = $form.serializeArray(),
          i;
      for (i = 0; i < form_fields.length; i++) {
        params = this._parseParamPair(params, form_fields[i].name, form_fields[i].value);
      }
      return params;
    },

    _parseQueryString: function(path) {
      var params = {}, parts, pairs, pair, i;

      parts = path.match(QUERY_STRING_MATCHER);
      if (parts && parts[1]) {
        pairs = parts[1].split('&');
        for (i = 0; i < pairs.length; i++) {
          pair = pairs[i].split('=');
          params = this._parseParamPair(params, _decode(pair[0]), _decode(pair[1] || ""));
        }
      }
      return params;
    },

    _parseParamPair: function(params, key, value) {
      if (typeof params[key] !== 'undefined') {
        if (_isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key], value];
        }
      } else {
        params[key] = value;
      }
      return params;
    },

    _listen: function(name, callback) {
      return this.$element().bind([name, this.eventNamespace()].join('.'), callback);
    },

    _unlisten: function(name, callback) {
      return this.$element().unbind([name, this.eventNamespace()].join('.'), callback);
    }

  });

  // `Sammy.RenderContext` is an object that makes sequential template loading,
  // rendering and interpolation seamless even when dealing with asynchronous
  // operations.
  //
  // `RenderContext` objects are not usually created directly, rather they are
  // instantiated from an `Sammy.EventContext` by using `render()`, `load()` or
  // `partial()` which all return `RenderContext` objects.
  //
  // `RenderContext` methods always returns a modified `RenderContext`
  // for chaining (like jQuery itself).
  //
  // The core magic is in the `then()` method which puts the callback passed as
  // an argument into a queue to be executed once the previous callback is complete.
  // All the methods of `RenderContext` are wrapped in `then()` which allows you
  // to queue up methods by chaining, but maintaining a guaranteed execution order
  // even with remote calls to fetch templates.
  //
  Sammy.RenderContext = function(event_context) {
    this.event_context    = event_context;
    this.callbacks        = [];
    this.previous_content = null;
    this.content          = null;
    this.next_engine      = false;
    this.waiting          = false;
  };

  Sammy.RenderContext.prototype = $.extend({}, Sammy.Object.prototype, {

    // The "core" of the `RenderContext` object, adds the `callback` to the
    // queue. If the context is `waiting` (meaning an async operation is happening)
    // then the callback will be executed in order, once the other operations are
    // complete. If there is no currently executing operation, the `callback`
    // is executed immediately.
    //
    // The value returned from the callback is stored in `content` for the
    // subsequent operation. If you return `false`, the queue will pause, and
    // the next callback in the queue will not be executed until `next()` is
    // called. This allows for the guaranteed order of execution while working
    // with async operations.
    //
    // If then() is passed a string instead of a function, the string is looked
    // up as a helper method on the event context.
    //
    // ### Example
    //
    //      this.get('#/', function() {
    //        // initialize the RenderContext
    //        // Even though `load()` executes async, the next `then()`
    //        // wont execute until the load finishes
    //        this.load('myfile.txt')
    //            .then(function(content) {
    //              // the first argument to then is the content of the
    //              // prev operation
    //              $('#main').html(content);
    //            });
    //      });
    //
    then: function(callback) {
      if (!_isFunction(callback)) {
        // if a string is passed to then, assume we want to call
        // a helper on the event context in its context
        if (typeof callback === 'string' && callback in this.event_context) {
          var helper = this.event_context[callback];
          callback = function(content) {
            return helper.apply(this.event_context, [content]);
          };
        } else {
          return this;
        }
      }
      var context = this;
      if (this.waiting) {
        this.callbacks.push(callback);
      } else {
        this.wait();
        window.setTimeout(function() {
          var returned = callback.apply(context, [context.content, context.previous_content]);
          if (returned !== false) {
            context.next(returned);
          }
        }, 0);
      }
      return this;
    },

    // Pause the `RenderContext` queue. Combined with `next()` allows for async
    // operations.
    //
    // ### Example
    //
    //        this.get('#/', function() {
    //          this.load('mytext.json')
    //              .then(function(content) {
    //                var context = this,
    //                    data    = JSON.parse(content);
    //                // pause execution
    //                context.wait();
    //                // post to a url
    //                $.post(data.url, {}, function(response) {
    //                  context.next(JSON.parse(response));
    //                });
    //              })
    //              .then(function(data) {
    //                // data is json from the previous post
    //                $('#message').text(data.status);
    //              });
    //        });
    wait: function() {
      this.waiting = true;
    },

    // Resume the queue, setting `content` to be used in the next operation.
    // See `wait()` for an example.
    next: function(content) {
      this.waiting = false;
      if (typeof content !== 'undefined') {
        this.previous_content = this.content;
        this.content = content;
      }
      if (this.callbacks.length > 0) {
        this.then(this.callbacks.shift());
      }
    },

    // Load a template into the context.
    // The `location` can either be a string specifying the remote path to the
    // file, a jQuery object, or a DOM element.
    //
    // No interpolation happens by default, the content is stored in
    // `content`.
    //
    // In the case of a path, unless the option `{cache: false}` is passed the
    // data is stored in the app's `templateCache()`.
    //
    // If a jQuery or DOM object is passed the `innerHTML` of the node is pulled in.
    // This is useful for nesting templates as part of the initial page load wrapped
    // in invisible elements or `<script>` tags. With template paths, the template
    // engine is looked up by the extension. For DOM/jQuery embedded templates,
    // this isnt possible, so there are a couple of options:
    //
    //  * pass an `{engine:}` option.
    //  * define the engine in the `data-engine` attribute of the passed node.
    //  * just store the raw template data and use `interpolate()` manually
    //
    // If a `callback` is passed it is executed after the template load.
    load: function(location, options, callback) {
      var context = this;
      return this.then(function() {
        var should_cache, cached, is_json, location_array;
        if (_isFunction(options)) {
          callback = options;
          options = {};
        } else {
          options = $.extend({}, options);
        }
        if (callback) { this.then(callback); }
        if (typeof location === 'string') {
          // it's a path
          is_json      = (location.match(/\.json(\?|$)/) || options.json);
          should_cache = is_json ? options.cache === true : options.cache !== false;
          context.next_engine = context.event_context.engineFor(location);
          delete options.cache;
          delete options.json;
          if (options.engine) {
            context.next_engine = options.engine;
            delete options.engine;
          }
          if (should_cache && (cached = this.event_context.app.templateCache(location))) {
            return cached;
          }
          this.wait();
          $.ajax($.extend({
            url: location,
            data: {},
            dataType: is_json ? 'json' : 'text',
            type: 'get',
            success: function(data) {
              if (should_cache) {
                context.event_context.app.templateCache(location, data);
              }
              context.next(data);
            }
          }, options));
          return false;
        } else {
          // it's a dom/jQuery
          if (location.nodeType) {
            return location.innerHTML;
          }
          if (location.selector) {
            // it's a jQuery
            context.next_engine = location.attr('data-engine');
            if (options.clone === false) {
              return location.remove()[0].innerHTML.toString();
            } else {
              return location[0].innerHTML.toString();
            }
          }
        }
      });
    },

    // Load partials
    //
    // ### Example
    //
    //      this.loadPartials({mypartial: '/path/to/partial'});
    //
    loadPartials: function(partials) {
      var name;
      if(partials) {
        this.partials = this.partials || {};
        for(name in partials) {
          (function(context, name) {
            context.load(partials[name])
                   .then(function(template) {
                     this.partials[name] = template;
                   });
          })(this, name);
        }
      }
      return this;
    },

    // `load()` a template and then `interpolate()` it with data.
    //
    // can be called with multiple different signatures:
    //
    //      this.render(callback);
    //      this.render('/location');
    //      this.render('/location', {some: data});
    //      this.render('/location', callback);
    //      this.render('/location', {some: data}, callback);
    //      this.render('/location', {some: data}, {my: partials});
    //      this.render('/location', callback, {my: partials});
    //      this.render('/location', {some: data}, callback, {my: partials});
    //
    // ### Example
    //
    //      this.get('#/', function() {
    //        this.render('mytemplate.template', {name: 'test'});
    //      });
    //
    render: function(location, data, callback, partials) {
      if (_isFunction(location) && !data) {
        // invoked as render(callback)
        return this.then(location);
      } else {
        if(_isFunction(data)) {
          // invoked as render(location, callback, [partials])
          partials = callback;
          callback = data;
          data = null;
        } else if(callback && !_isFunction(callback)) {
          // invoked as render(location, data, partials)
          partials = callback;
          callback = null;
        }

        return this.loadPartials(partials)
                   .load(location)
                   .interpolate(data, location)
                   .then(callback);
      }
    },

    // `render()` the `location` with `data` and then `swap()` the
    // app's `$element` with the rendered content.
    partial: function(location, data, callback, partials) {
      if (_isFunction(callback)) {
        // invoked as partial(location, data, callback, [partials])
        return this.render(location, data, partials).swap(callback);
      } else if (_isFunction(data)) {
        // invoked as partial(location, callback, [partials])
        return this.render(location, {}, callback).swap(data);
      } else {
        // invoked as partial(location, data, [partials])
        return this.render(location, data, callback).swap();
      }
    },

    // defers the call of function to occur in order of the render queue.
    // The function can accept any number of arguments as long as the last
    // argument is a callback function. This is useful for putting arbitrary
    // asynchronous functions into the queue. The content passed to the
    // callback is passed as `content` to the next item in the queue.
    //
    // ### Example
    //
    //     this.send($.getJSON, '/app.json')
    //         .then(function(json) {
    //           $('#message).text(json['message']);
    //          });
    //
    //
    send: function() {
      var context = this,
          args = _makeArray(arguments),
          fun  = args.shift();

      if (_isArray(args[0])) { args = args[0]; }

      return this.then(function(content) {
        args.push(function(response) { context.next(response); });
        context.wait();
        fun.apply(fun, args);
        return false;
      });
    },

    // iterates over an array, applying the callback for each item item. the
    // callback takes the same style of arguments as `jQuery.each()` (index, item).
    // The return value of each callback is collected as a single string and stored
    // as `content` to be used in the next iteration of the `RenderContext`.
    collect: function(array, callback, now) {
      var context = this;
      var coll = function() {
        if (_isFunction(array)) {
          callback = array;
          array = this.content;
        }
        var contents = [], doms = false;
        $.each(array, function(i, item) {
          var returned = callback.apply(context, [i, item]);
          if (returned.jquery && returned.length == 1) {
            returned = returned[0];
            doms = true;
          }
          contents.push(returned);
          return returned;
        });
        return doms ? contents : contents.join('');
      };
      return now ? coll() : this.then(coll);
    },

    // loads a template, and then interpolates it for each item in the `data`
    // array. If a callback is passed, it will call the callback with each
    // item in the array _after_ interpolation
    renderEach: function(location, name, data, callback) {
      if (_isArray(name)) {
        callback = data;
        data = name;
        name = null;
      }
      return this.load(location).then(function(content) {
          var rctx = this;
          if (!data) {
            data = _isArray(this.previous_content) ? this.previous_content : [];
          }
          if (callback) {
            $.each(data, function(i, value) {
              var idata = {}, engine = this.next_engine || location;
              if (name) {
                idata[name] = value;
              } else {
                idata = value;
              }
              callback(value, rctx.event_context.interpolate(content, idata, engine));
            });
          } else {
            return this.collect(data, function(i, value) {
              var idata = {}, engine = this.next_engine || location;
              if (name) {
                idata[name] = value;
              } else {
                idata = value;
              }
              return this.event_context.interpolate(content, idata, engine);
            }, true);
          }
      });
    },

    // uses the previous loaded `content` and the `data` object to interpolate
    // a template. `engine` defines the templating/interpolation method/engine
    // that should be used. If `engine` is not passed, the `next_engine` is
    // used. If `retain` is `true`, the final interpolated data is appended to
    // the `previous_content` instead of just replacing it.
    interpolate: function(data, engine, retain) {
      var context = this;
      return this.then(function(content, prev) {
        if (!data && prev) { data = prev; }
        if (this.next_engine) {
          engine = this.next_engine;
          this.next_engine = false;
        }
        var rendered = context.event_context.interpolate(content, data, engine, this.partials);
        return retain ? prev + rendered : rendered;
      });
    },

    // Swap the return contents ensuring order. See `Application#swap`
    swap: function(callback) {
      return this.then(function(content) {
        this.event_context.swap(content, callback);
        return content;
      }).trigger('changed', {});
    },

    // Same usage as `jQuery.fn.appendTo()` but uses `then()` to ensure order
    appendTo: function(selector) {
      return this.then(function(content) {
        $(selector).append(content);
      }).trigger('changed', {});
    },

    // Same usage as `jQuery.fn.prependTo()` but uses `then()` to ensure order
    prependTo: function(selector) {
      return this.then(function(content) {
        $(selector).prepend(content);
      }).trigger('changed', {});
    },

    // Replaces the `$(selector)` using `html()` with the previously loaded
    // `content`
    replace: function(selector) {
      return this.then(function(content) {
        $(selector).html(content);
      }).trigger('changed', {});
    },

    // trigger the event in the order of the event context. Same semantics
    // as `Sammy.EventContext#trigger()`. If data is omitted, `content`
    // is sent as `{content: content}`
    trigger: function(name, data) {
      return this.then(function(content) {
        if (typeof data == 'undefined') { data = {content: content}; }
        this.event_context.trigger(name, data);
        return content;
      });
    }

  });

  // `Sammy.EventContext` objects are created every time a route is run or a
  // bound event is triggered. The callbacks for these events are evaluated within a `Sammy.EventContext`
  // This within these callbacks the special methods of `EventContext` are available.
  //
  // ### Example
  //
  //       $.sammy(function() {
  //         // The context here is this Sammy.Application
  //         this.get('#/:name', function() {
  //           // The context here is a new Sammy.EventContext
  //           if (this.params['name'] == 'sammy') {
  //             this.partial('name.html.erb', {name: 'Sammy'});
  //           } else {
  //             this.redirect('#/somewhere-else')
  //           }
  //         });
  //       });
  //
  // Initialize a new EventContext
  //
  // ### Arguments
  //
  // * `app` The `Sammy.Application` this event is called within.
  // * `verb` The verb invoked to run this context/route.
  // * `path` The string path invoked to run this context/route.
  // * `params` An Object of optional params to pass to the context. Is converted
  //   to a `Sammy.Object`.
  // * `target` a DOM element that the event that holds this context originates
  //   from. For post, put and del routes, this is the form element that triggered
  //   the route.
  //
  Sammy.EventContext = function(app, verb, path, params, target) {
    this.app    = app;
    this.verb   = verb;
    this.path   = path;
    this.params = new Sammy.Object(params);
    this.target = target;
  };

  Sammy.EventContext.prototype = $.extend({}, Sammy.Object.prototype, {

    // A shortcut to the app's `$element()`
    $element: function() {
      return this.app.$element(_makeArray(arguments).shift());
    },

    // Look up a templating engine within the current app and context.
    // `engine` can be one of the following:
    //
    // * a function: should conform to `function(content, data) { return interpolated; }`
    // * a template path: 'template.ejs', looks up the extension to match to
    //   the `ejs()` helper
    // * a string referring to the helper: "mustache" => `mustache()`
    //
    // If no engine is found, use the app's default `template_engine`
    //
    engineFor: function(engine) {
      var context = this, engine_match;
      // if path is actually an engine function just return it
      if (_isFunction(engine)) { return engine; }
      // lookup engine name by path extension
      engine = (engine || context.app.template_engine).toString();
      if ((engine_match = engine.match(/\.([^\.\?\#]+)(\?|$)/))) {
        engine = engine_match[1];
      }
      // set the engine to the default template engine if no match is found
      if (engine && _isFunction(context[engine])) {
        return context[engine];
      }

      if (context.app.template_engine) {
        return this.engineFor(context.app.template_engine);
      }
      return function(content, data) { return content; };
    },

    // using the template `engine` found with `engineFor()`, interpolate the
    // `data` into `content`
    interpolate: function(content, data, engine, partials) {
      return this.engineFor(engine).apply(this, [content, data, partials]);
    },

    // Create and return a `Sammy.RenderContext` calling `render()` on it.
    // Loads the template and interpolate the data, however does not actual
    // place it in the DOM.
    //
    // ### Example
    //
    //      // mytemplate.mustache <div class="name">{{name}}</div>
    //      render('mytemplate.mustache', {name: 'quirkey'});
    //      // sets the `content` to <div class="name">quirkey</div>
    //      render('mytemplate.mustache', {name: 'quirkey'})
    //        .appendTo('ul');
    //      // appends the rendered content to $('ul')
    //
    render: function(location, data, callback, partials) {
      return new Sammy.RenderContext(this).render(location, data, callback, partials);
    },

    // Create and return a `Sammy.RenderContext` calling `renderEach()` on it.
    // Loads the template and interpolates the data for each item,
    // however does not actually place it in the DOM.
    //
    // `name` is an optional parameter (if it is an array, it is used as `data`,
    // and the third parameter used as `callback`, if set).
    //
    // If `data` is not provided, content from the previous step in the chain
    // (if it is an array) is used, and `name` is used as the key for each
    // element of the array (useful for referencing in template).
    //
    // ### Example
    //
    //      // mytemplate.mustache <div class="name">{{name}}</div>
    //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}])
    //      // sets the `content` to <div class="name">quirkey</div><div class="name">endor</div>
    //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}]).appendTo('ul');
    //      // appends the rendered content to $('ul')
    //
    //      // names.json: ["quirkey", "endor"]
    //      this.load('names.json').renderEach('mytemplate.mustache', 'name').appendTo('ul');
    //      // uses the template to render each item in the JSON array
    //
    renderEach: function(location, name, data, callback) {
      return new Sammy.RenderContext(this).renderEach(location, name, data, callback);
    },

    // create a new `Sammy.RenderContext` calling `load()` with `location` and
    // `options`. Called without interpolation or placement, this allows for
    // preloading/caching the templates.
    load: function(location, options, callback) {
      return new Sammy.RenderContext(this).load(location, options, callback);
    },

    // create a new `Sammy.RenderContext` calling `loadPartials()` with `partials`.
    loadPartials: function(partials) {
      return new Sammy.RenderContext(this).loadPartials(partials);
    },

    // `render()` the `location` with `data` and then `swap()` the
    // app's `$element` with the rendered content.
    partial: function(location, data, callback, partials) {
      return new Sammy.RenderContext(this).partial(location, data, callback, partials);
    },

    // create a new `Sammy.RenderContext` calling `send()` with an arbitrary
    // function
    send: function() {
      var rctx = new Sammy.RenderContext(this);
      return rctx.send.apply(rctx, arguments);
    },

    // Changes the location of the current window. If `to` begins with
    // '#' it only changes the document's hash. If passed more than 1 argument
    // redirect will join them together with forward slashes.
    //
    // ### Example
    //
    //      redirect('#/other/route');
    //      // equivalent to
    //      redirect('#', 'other', 'route');
    //
    redirect: function() {
      var to, args = _makeArray(arguments),
          current_location = this.app.getLocation(),
          l = args.length;
      if (l > 1) {
        var i = 0, paths = [], pairs = [], params = {}, has_params = false;
        for (; i < l; i++) {
          if (typeof args[i] == 'string') {
            paths.push(args[i]);
          } else {
            $.extend(params, args[i]);
            has_params = true;
          }
        }
        to = paths.join('/');
        if (has_params) {
          for (var k in params) {
            pairs.push(this.app._encodeFormPair(k, params[k]));
          }
          to += '?' + pairs.join('&');
        }
      } else {
        to = args[0];
      }
      this.trigger('redirect', {to: to});
      this.app.last_location = [this.verb, this.path];
      this.app.setLocation(to);
      if (new RegExp(to).test(current_location)) {
        this.app.trigger('location-changed');
      }
    },

    // Triggers events on `app` within the current context.
    trigger: function(name, data) {
      if (typeof data == 'undefined') { data = {}; }
      if (!data.context) { data.context = this; }
      return this.app.trigger(name, data);
    },

    // A shortcut to app's `eventNamespace()`
    eventNamespace: function() {
      return this.app.eventNamespace();
    },

    // A shortcut to app's `swap()`
    swap: function(contents, callback) {
      return this.app.swap(contents, callback);
    },

    // Raises a possible `notFound()` error for the current path.
    notFound: function() {
      return this.app.notFound(this.verb, this.path);
    },

    // Default JSON parsing uses jQuery's `parseJSON()`. Include `Sammy.JSON`
    // plugin for the more conformant "crockford special".
    json: function(string) {
      return $.parseJSON(string);
    },

    // //=> Sammy.EventContext: get #/ {}
    toString: function() {
      return "Sammy.EventContext: " + [this.verb, this.path, this.params].join(' ');
    }

  });

  return Sammy;
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
__webpack_require__(40)
__webpack_require__(41)
__webpack_require__(42)
__webpack_require__(43)
__webpack_require__(44)
__webpack_require__(45)
__webpack_require__(46)
__webpack_require__(47)
__webpack_require__(48)
__webpack_require__(49)
__webpack_require__(50)
__webpack_require__(51)

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);


/***/ }),
/* 51 */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(14)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./swiper.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./swiper.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/**\n * Swiper 3.4.2\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n *\n * http://www.idangero.us/swiper/\n *\n * Copyright 2017, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n *\n * Licensed under MIT\n *\n * Released on: March 10, 2017\n */\n.swiper-container {\n  margin-left: auto;\n  margin-right: auto;\n  position: relative;\n  overflow: hidden;\n  /* Fix of Webkit flickering */\n  z-index: 1;\n}\n.swiper-container-no-flexbox .swiper-slide {\n  float: left;\n}\n.swiper-container-vertical > .swiper-wrapper {\n  -webkit-box-orient: vertical;\n  -moz-box-orient: vertical;\n  -ms-flex-direction: column;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n.swiper-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-transition-property: -webkit-transform;\n  -moz-transition-property: -moz-transform;\n  -o-transition-property: -o-transform;\n  -ms-transition-property: -ms-transform;\n  transition-property: transform;\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n.swiper-container-android .swiper-slide,\n.swiper-wrapper {\n  -webkit-transform: translate3d(0px, 0, 0);\n  -moz-transform: translate3d(0px, 0, 0);\n  -o-transform: translate(0px, 0px);\n  -ms-transform: translate3d(0px, 0, 0);\n  transform: translate3d(0px, 0, 0);\n}\n.swiper-container-multirow > .swiper-wrapper {\n  -webkit-box-lines: multiple;\n  -moz-box-lines: multiple;\n  -ms-flex-wrap: wrap;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.swiper-container-free-mode > .swiper-wrapper {\n  -webkit-transition-timing-function: ease-out;\n  -moz-transition-timing-function: ease-out;\n  -ms-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n  margin: 0 auto;\n}\n.swiper-slide {\n  -webkit-flex-shrink: 0;\n  -ms-flex: 0 0 auto;\n  flex-shrink: 0;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n/* Auto Height */\n.swiper-container-autoheight,\n.swiper-container-autoheight .swiper-slide {\n  height: auto;\n}\n.swiper-container-autoheight .swiper-wrapper {\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n  -webkit-transition-property: -webkit-transform, height;\n  -moz-transition-property: -moz-transform;\n  -o-transition-property: -o-transform;\n  -ms-transition-property: -ms-transform;\n  transition-property: transform, height;\n}\n/* a11y */\n.swiper-container .swiper-notification {\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  opacity: 0;\n  z-index: -1000;\n}\n/* IE10 Windows Phone 8 Fixes */\n.swiper-wp8-horizontal {\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n.swiper-wp8-vertical {\n  -ms-touch-action: pan-x;\n  touch-action: pan-x;\n}\n/* Arrows */\n.swiper-button-prev,\n.swiper-button-next {\n  position: absolute;\n  top: 50%;\n  width: 27px;\n  height: 44px;\n  margin-top: -22px;\n  z-index: 10;\n  cursor: pointer;\n  -moz-background-size: 27px 44px;\n  -webkit-background-size: 27px 44px;\n  background-size: 27px 44px;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.swiper-button-prev.swiper-button-disabled,\n.swiper-button-next.swiper-button-disabled {\n  opacity: 0.35;\n  cursor: auto;\n  pointer-events: none;\n}\n.swiper-button-prev,\n.swiper-container-rtl .swiper-button-next {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n  left: 10px;\n  right: auto;\n}\n.swiper-button-prev.swiper-button-black,\n.swiper-container-rtl .swiper-button-next.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-prev.swiper-button-white,\n.swiper-container-rtl .swiper-button-next.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-next,\n.swiper-container-rtl .swiper-button-prev {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n  right: 10px;\n  left: auto;\n}\n.swiper-button-next.swiper-button-black,\n.swiper-container-rtl .swiper-button-prev.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-next.swiper-button-white,\n.swiper-container-rtl .swiper-button-prev.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\");\n}\n/* Pagination Styles */\n.swiper-pagination {\n  position: absolute;\n  text-align: center;\n  -webkit-transition: 300ms;\n  -moz-transition: 300ms;\n  -o-transition: 300ms;\n  transition: 300ms;\n  -webkit-transform: translate3d(0, 0, 0);\n  -ms-transform: translate3d(0, 0, 0);\n  -o-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  z-index: 10;\n}\n.swiper-pagination.swiper-pagination-hidden {\n  opacity: 0;\n}\n/* Common Styles */\n.swiper-pagination-fraction,\n.swiper-pagination-custom,\n.swiper-container-horizontal > .swiper-pagination-bullets {\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n}\n/* Bullets */\n.swiper-pagination-bullet {\n  width: 8px;\n  height: 8px;\n  display: inline-block;\n  border-radius: 100%;\n  background: #000;\n  opacity: 0.2;\n}\nbutton.swiper-pagination-bullet {\n  border: none;\n  margin: 0;\n  padding: 0;\n  box-shadow: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n}\n.swiper-pagination-clickable .swiper-pagination-bullet {\n  cursor: pointer;\n}\n.swiper-pagination-white .swiper-pagination-bullet {\n  background: #fff;\n}\n.swiper-pagination-bullet-active {\n  opacity: 1;\n  background: #007aff;\n}\n.swiper-pagination-white .swiper-pagination-bullet-active {\n  background: #fff;\n}\n.swiper-pagination-black .swiper-pagination-bullet-active {\n  background: #000;\n}\n.swiper-container-vertical > .swiper-pagination-bullets {\n  right: 10px;\n  top: 50%;\n  -webkit-transform: translate3d(0px, -50%, 0);\n  -moz-transform: translate3d(0px, -50%, 0);\n  -o-transform: translate(0px, -50%);\n  -ms-transform: translate3d(0px, -50%, 0);\n  transform: translate3d(0px, -50%, 0);\n}\n.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 5px 0;\n  display: block;\n}\n.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 0 5px;\n}\n/* Progress */\n.swiper-pagination-progress {\n  background: rgba(0, 0, 0, 0.25);\n  position: absolute;\n}\n.swiper-pagination-progress .swiper-pagination-progressbar {\n  background: #007aff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: scale(0);\n  -ms-transform: scale(0);\n  -o-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: left top;\n  -moz-transform-origin: left top;\n  -ms-transform-origin: left top;\n  -o-transform-origin: left top;\n  transform-origin: left top;\n}\n.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar {\n  -webkit-transform-origin: right top;\n  -moz-transform-origin: right top;\n  -ms-transform-origin: right top;\n  -o-transform-origin: right top;\n  transform-origin: right top;\n}\n.swiper-container-horizontal > .swiper-pagination-progress {\n  width: 100%;\n  height: 4px;\n  left: 0;\n  top: 0;\n}\n.swiper-container-vertical > .swiper-pagination-progress {\n  width: 4px;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.swiper-pagination-progress.swiper-pagination-white {\n  background: rgba(255, 255, 255, 0.5);\n}\n.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar {\n  background: #fff;\n}\n.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar {\n  background: #000;\n}\n/* 3D Container */\n.swiper-container-3d {\n  -webkit-perspective: 1200px;\n  -moz-perspective: 1200px;\n  -o-perspective: 1200px;\n  perspective: 1200px;\n}\n.swiper-container-3d .swiper-wrapper,\n.swiper-container-3d .swiper-slide,\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom,\n.swiper-container-3d .swiper-cube-shadow {\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n}\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 10;\n}\n.swiper-container-3d .swiper-slide-shadow-left {\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  background-image: -moz-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 3.6-15 */\n  background-image: -o-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n.swiper-container-3d .swiper-slide-shadow-right {\n  background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 3.6-15 */\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n.swiper-container-3d .swiper-slide-shadow-top {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  background-image: -moz-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 3.6-15 */\n  background-image: -o-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 3.6-15 */\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n/* Coverflow */\n.swiper-container-coverflow .swiper-wrapper,\n.swiper-container-flip .swiper-wrapper {\n  /* Windows 8 IE 10 fix */\n  -ms-perspective: 1200px;\n}\n/* Cube + Flip */\n.swiper-container-cube,\n.swiper-container-flip {\n  overflow: visible;\n}\n.swiper-container-cube .swiper-slide,\n.swiper-container-flip .swiper-slide {\n  pointer-events: none;\n  -webkit-backface-visibility: hidden;\n  -moz-backface-visibility: hidden;\n  -ms-backface-visibility: hidden;\n  backface-visibility: hidden;\n  z-index: 1;\n}\n.swiper-container-cube .swiper-slide .swiper-slide,\n.swiper-container-flip .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-flip .swiper-slide-active,\n.swiper-container-cube .swiper-slide-active .swiper-slide-active,\n.swiper-container-flip .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n.swiper-container-cube .swiper-slide-shadow-top,\n.swiper-container-flip .swiper-slide-shadow-top,\n.swiper-container-cube .swiper-slide-shadow-bottom,\n.swiper-container-flip .swiper-slide-shadow-bottom,\n.swiper-container-cube .swiper-slide-shadow-left,\n.swiper-container-flip .swiper-slide-shadow-left,\n.swiper-container-cube .swiper-slide-shadow-right,\n.swiper-container-flip .swiper-slide-shadow-right {\n  z-index: 0;\n  -webkit-backface-visibility: hidden;\n  -moz-backface-visibility: hidden;\n  -ms-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n/* Cube */\n.swiper-container-cube .swiper-slide {\n  visibility: hidden;\n  -webkit-transform-origin: 0 0;\n  -moz-transform-origin: 0 0;\n  -ms-transform-origin: 0 0;\n  transform-origin: 0 0;\n  width: 100%;\n  height: 100%;\n}\n.swiper-container-cube.swiper-container-rtl .swiper-slide {\n  -webkit-transform-origin: 100% 0;\n  -moz-transform-origin: 100% 0;\n  -ms-transform-origin: 100% 0;\n  transform-origin: 100% 0;\n}\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-cube .swiper-slide-next,\n.swiper-container-cube .swiper-slide-prev,\n.swiper-container-cube .swiper-slide-next + .swiper-slide {\n  pointer-events: auto;\n  visibility: visible;\n}\n.swiper-container-cube .swiper-cube-shadow {\n  position: absolute;\n  left: 0;\n  bottom: 0px;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: 0.6;\n  -webkit-filter: blur(50px);\n  filter: blur(50px);\n  z-index: 0;\n}\n/* Fade */\n.swiper-container-fade.swiper-container-free-mode .swiper-slide {\n  -webkit-transition-timing-function: ease-out;\n  -moz-transition-timing-function: ease-out;\n  -ms-transition-timing-function: ease-out;\n  -o-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n}\n.swiper-container-fade .swiper-slide {\n  pointer-events: none;\n  -webkit-transition-property: opacity;\n  -moz-transition-property: opacity;\n  -o-transition-property: opacity;\n  transition-property: opacity;\n}\n.swiper-container-fade .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-fade .swiper-slide-active,\n.swiper-container-fade .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n.swiper-zoom-container {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  text-align: center;\n}\n.swiper-zoom-container > img,\n.swiper-zoom-container > svg,\n.swiper-zoom-container > canvas {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n/* Scrollbar */\n.swiper-scrollbar {\n  border-radius: 10px;\n  position: relative;\n  -ms-touch-action: none;\n  background: rgba(0, 0, 0, 0.1);\n}\n.swiper-container-horizontal > .swiper-scrollbar {\n  position: absolute;\n  left: 1%;\n  bottom: 3px;\n  z-index: 50;\n  height: 5px;\n  width: 98%;\n}\n.swiper-container-vertical > .swiper-scrollbar {\n  position: absolute;\n  right: 3px;\n  top: 1%;\n  z-index: 50;\n  width: 5px;\n  height: 98%;\n}\n.swiper-scrollbar-drag {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 10px;\n  left: 0;\n  top: 0;\n}\n.swiper-scrollbar-cursor-drag {\n  cursor: move;\n}\n/* Preloader */\n.swiper-lazy-preloader {\n  width: 42px;\n  height: 42px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -21px;\n  margin-top: -21px;\n  z-index: 10;\n  -webkit-transform-origin: 50%;\n  -moz-transform-origin: 50%;\n  transform-origin: 50%;\n  -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;\n  -moz-animation: swiper-preloader-spin 1s steps(12, end) infinite;\n  animation: swiper-preloader-spin 1s steps(12, end) infinite;\n}\n.swiper-lazy-preloader:after {\n  display: block;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-position: 50%;\n  -webkit-background-size: 100%;\n  background-size: 100%;\n  background-repeat: no-repeat;\n}\n.swiper-lazy-preloader-white:after {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n@-webkit-keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes swiper-preloader-spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(14)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports
exports.i(__webpack_require__(57), "");
exports.i(__webpack_require__(58), "");
exports.i(__webpack_require__(65), "");
exports.i(__webpack_require__(66), "");

// module
exports.push([module.i, ".imgGal img{\n  display: block;\n  /*width: 300px;*/\n  width: 100%;\n  /*height: 46vh;*/\n}\n\n/*.imgWrap {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    display: -webkit-box;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-transition-property: -webkit-transform;\n    -moz-transition-property: -moz-transform;\n    -o-transition-property: -o-transform;\n    -ms-transition-property: -ms-transform;\n    transition-property: transform;\n    -webkit-box-sizing: content-box;\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n}\n\n.img-swiper-slide {\n    -webkit-flex-shrink: 0;\n    -ms-flex: 0 0 auto;\n    flex-shrink: 0;\n    width: 100%;\n    height: 100%;\n    position: relative;\n}*/\n.img-next-control, .img-prev-control{\n  position: relative;\n    top: 50%;\n    width: 27px;\n    height: 44px;\n    margin-top: -22px;\n    z-index: 10;\n    cursor: pointer;\n    -moz-background-size: 27px 44px;\n    -webkit-background-size: 27px 44px;\n    background-size: 27px 44px;\n    background-position: center;\n    background-repeat: no-repeat;\n}\n.img-next-control{\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n\n    right: 10px;\n    left: auto;\n}\n.img-prev-control{\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n\n    left: 10px;\n    right: auto;\n}\n\n\n/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\nNAVIGATION\n/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */\n\n.navigation-top {\n  margin-top: 3em;\n  margin-bottom: 15px;\n  display: block;\n  width: 100%;\n  height: auto;\n  position: relative;\n}\n\n.landscape .navigation-top {\n  margin-top: 2em;\n}\n\n.menu-main-container {\n  height: 15vw;\n  font-size: 1.8em;\n  border-bottom: solid 1px #00f;\n  padding-bottom: 18px;\n}\n\n.landscape .menu-main-container {\n  height: 16vh;\n  font-size: 1.6em;\n  border-bottom: solid 1px #00f;\n  padding-bottom: 10px;\n}\n\n.menu-main-container a {\n  text-decoration: none;\n  color: #00f;\n  /*color: #8080ff;*/\n}\n\n.menu-main-container li {\n  list-style: none;\n}\n\n.menu {\n  z-index: 2000;\n  padding-top: 8px;\n  list-style: none;\n  background: #fff;\n  transition: 1s;\n}\n\n#top-menu {\n  transition-property: opacity;\n  transition-duration: .45s;\n}\n#top-menu > li {\n  display: none;\n}\n\n#top-menu .active  {\n  display: block;\n}\n\n.hide-lp {\n  opacity: 0;\n}\n\n/*///*/\n\n.sub-menu {\n  padding-top: 10px;\n  position: absolute;\n  top : 0;\n  margin: 0 -6px;\n  padding: 0 12px 0 0;\n  width : 76.92307692vw;\n  list-style: none;\n  visibility: hidden;\n  z-index: 1;\n  /* display: none; */\n}\n\n.active .sub-menu li {\n  visibility: visible;\n  opacity: 1;\n}\n\n.pre-mob .active .sub-menu li {\n  visibility: hidden;\n  opacity: 0;\n}\n\n.sub-menu li {\n  opacity: 0;\n  transition: opacity .15s;\n}\n.sub-menu li a {\n  color: #8080ff;\n}\n\n.sub-menu .active a {\n  color: #00f;\n}\n/*///*/\n\n\n/*Logo header*/\n#signature-portique_LP {\n  width: 90%;\n  position: relative;\n  display: block;\n\n  margin: 0 auto;\n  transition: width .2s, padding .1s;\n}\n\n.landscape #signature-portique_LP {\n  width: 50%;\n  padding: 5%;\n\n  /*margin: 0 auto;\n  display: block;*/\n}\n.logo-mobile {\n  float: right;\n  position: absolute;\n  margin-right: 1em;\n  top: 0.4em;\n  right: 0;\n  z-index: 2000;\n}\n.lp-home {\n  display: block;\n  margin: 0 auto;\n  transform: rotate(0deg);\n  transition: transform .8s;\n}\n\n.lp-move {\n  animation: lpmove .65s;\n  animation-iteration-count: 2;\n}\n\n.lp-active {\n  transition: transform .8s;\n  transform: rotate(-38deg);\n}\n\n@keyframes lpmove {\n  0% {    transform: rotate(0deg);}\n  25% {    transform: rotate(-5deg);}\n  50% {    transform: rotate(5deg);}\n  75% {    transform: rotate(-5deg);}\n  100% {    transform: rotate(0deg);}\n\n}\n\n.pre-mob {\n  /*width: 84.61538462%;\n  padding-right: 11.53846154%;*/\n}\n.pre-mob li{\n  display: block !important;\n  width: 50%;\n}\n\n.push-top {\n  top: 1em;\n}\n\n/*Partie sociale*/\n.social-item {\n  display: block !important;\n  position: relative;\n}\n.social-item a {\n  position: relative;\n  font-size: 1.4em;\n}\n.social-item a i {\n  width: 100%;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n/*------------------------------------*\\\n    Page Newsletter\n\\*------------------------------------*/\nbody > iframe{\n}\n\n\n/* ========================================================================== */\n/* ========================================================================== */\n\n/************************************\n|\t\tBOOTSTRAP GRID SYSTEM\t\t|\n************************************/\n\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.row {\n  margin-left: -6px;\n  margin-right: -6px;\n}\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12, .col-xs-13, .col-sm-13, .col-md-13, .col-lg-13, .col-xs-14, .col-sm-14, .col-md-14, .col-lg-14, .col-xs-15, .col-sm-15, .col-md-15, .col-lg-15, .col-xs-16, .col-sm-16, .col-md-16, .col-lg-16, .col-xs-17, .col-sm-17, .col-md-17, .col-lg-17, .col-xs-18, .col-sm-18, .col-md-18, .col-lg-18, .col-xs-19, .col-sm-19, .col-md-19, .col-lg-19, .col-xs-20, .col-sm-20, .col-md-20, .col-lg-20, .col-xs-21, .col-sm-21, .col-md-21, .col-lg-21, .col-xs-22, .col-sm-22, .col-md-22, .col-lg-22, .col-xs-23, .col-sm-23, .col-md-23, .col-lg-23, .col-xs-24, .col-sm-24, .col-md-24, .col-lg-24, .col-xs-25, .col-sm-25, .col-md-25, .col-lg-25, .col-xs-26, .col-sm-26, .col-md-26, .col-lg-26 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-13, .col-xs-14, .col-xs-15, .col-xs-16, .col-xs-17, .col-xs-18, .col-xs-19, .col-xs-20, .col-xs-21, .col-xs-22, .col-xs-23, .col-xs-24, .col-xs-25, .col-xs-26 {\n  float: left;\n}\n.col-xs-26 {\n  width: 100%;\n}\n.col-xs-25 {\n  width: 96.15384615%;\n}\n.col-xs-24 {\n  width: 92.30769231%;\n}\n.col-xs-23 {\n  width: 88.46153846%;\n}\n.col-xs-22 {\n  width: 84.61538462%;\n}\n.col-xs-21 {\n  width: 80.76923077%;\n}\n.col-xs-20 {\n  width: 76.92307692%;\n}\n.col-xs-19 {\n  width: 73.07692308%;\n}\n.col-xs-18 {\n  width: 69.23076923%;\n}\n.col-xs-17 {\n  width: 65.38461538%;\n}\n.col-xs-16 {\n  width: 61.53846154%;\n}\n.col-xs-15 {\n  width: 57.69230769%;\n}\n.col-xs-14 {\n  width: 53.84615385%;\n}\n.col-xs-13 {\n  width: 50%;\n}\n.col-xs-12 {\n  width: 46.15384615%;\n}\n.col-xs-11 {\n  width: 42.30769231%;\n}\n.col-xs-10 {\n  width: 38.46153846%;\n}\n.col-xs-9 {\n  width: 34.61538462%;\n}\n.col-xs-8 {\n  width: 30.76923077%;\n}\n.col-xs-7 {\n  width: 26.92307692%;\n}\n.col-xs-6 {\n  width: 23.07692308%;\n}\n.col-xs-5 {\n  width: 19.23076923%;\n}\n.col-xs-4 {\n  width: 15.38461538%;\n}\n.col-xs-3 {\n  width: 11.53846154%;\n}\n.col-xs-2 {\n  width: 7.69230769%;\n}\n.col-xs-1 {\n  width: 3.84615385%;\n}\n.col-xs-pull-26 {\n  right: 100%;\n}\n.col-xs-pull-25 {\n  right: 96.15384615%;\n}\n.col-xs-pull-24 {\n  right: 92.30769231%;\n}\n.col-xs-pull-23 {\n  right: 88.46153846%;\n}\n.col-xs-pull-22 {\n  right: 84.61538462%;\n}\n.col-xs-pull-21 {\n  right: 80.76923077%;\n}\n.col-xs-pull-20 {\n  right: 76.92307692%;\n}\n.col-xs-pull-19 {\n  right: 73.07692308%;\n}\n.col-xs-pull-18 {\n  right: 69.23076923%;\n}\n.col-xs-pull-17 {\n  right: 65.38461538%;\n}\n.col-xs-pull-16 {\n  right: 61.53846154%;\n}\n.col-xs-pull-15 {\n  right: 57.69230769%;\n}\n.col-xs-pull-14 {\n  right: 53.84615385%;\n}\n.col-xs-pull-13 {\n  right: 50%;\n}\n.col-xs-pull-12 {\n  right: 46.15384615%;\n}\n.col-xs-pull-11 {\n  right: 42.30769231%;\n}\n.col-xs-pull-10 {\n  right: 38.46153846%;\n}\n.col-xs-pull-9 {\n  right: 34.61538462%;\n}\n.col-xs-pull-8 {\n  right: 30.76923077%;\n}\n.col-xs-pull-7 {\n  right: 26.92307692%;\n}\n.col-xs-pull-6 {\n  right: 23.07692308%;\n}\n.col-xs-pull-5 {\n  right: 19.23076923%;\n}\n.col-xs-pull-4 {\n  right: 15.38461538%;\n}\n.col-xs-pull-3 {\n  right: 11.53846154%;\n}\n.col-xs-pull-2 {\n  right: 7.69230769%;\n}\n.col-xs-pull-1 {\n  right: 3.84615385%;\n}\n.col-xs-pull-0 {\n  right: auto;\n}\n.col-xs-push-26 {\n  left: 100%;\n}\n.col-xs-push-25 {\n  left: 96.15384615%;\n}\n.col-xs-push-24 {\n  left: 92.30769231%;\n}\n.col-xs-push-23 {\n  left: 88.46153846%;\n}\n.col-xs-push-22 {\n  left: 84.61538462%;\n}\n.col-xs-push-21 {\n  left: 80.76923077%;\n}\n.col-xs-push-20 {\n  left: 76.92307692%;\n}\n.col-xs-push-19 {\n  left: 73.07692308%;\n}\n.col-xs-push-18 {\n  left: 69.23076923%;\n}\n.col-xs-push-17 {\n  left: 65.38461538%;\n}\n.col-xs-push-16 {\n  left: 61.53846154%;\n}\n.col-xs-push-15 {\n  left: 57.69230769%;\n}\n.col-xs-push-14 {\n  left: 53.84615385%;\n}\n.col-xs-push-13 {\n  left: 50%;\n}\n.col-xs-push-12 {\n  left: 46.15384615%;\n}\n.col-xs-push-11 {\n  left: 42.30769231%;\n}\n.col-xs-push-10 {\n  left: 38.46153846%;\n}\n.col-xs-push-9 {\n  left: 34.61538462%;\n}\n.col-xs-push-8 {\n  left: 30.76923077%;\n}\n.col-xs-push-7 {\n  left: 26.92307692%;\n}\n.col-xs-push-6 {\n  left: 23.07692308%;\n}\n.col-xs-push-5 {\n  left: 19.23076923%;\n}\n.col-xs-push-4 {\n  left: 15.38461538%;\n}\n.col-xs-push-3 {\n  left: 11.53846154%;\n}\n.col-xs-push-2 {\n  left: 7.69230769%;\n}\n.col-xs-push-1 {\n  left: 3.84615385%;\n}\n.col-xs-push-0 {\n  left: auto;\n}\n.col-xs-offset-26 {\n  margin-left: 100%;\n}\n.col-xs-offset-25 {\n  margin-left: 96.15384615%;\n}\n.col-xs-offset-24 {\n  margin-left: 92.30769231%;\n}\n.col-xs-offset-23 {\n  margin-left: 88.46153846%;\n}\n.col-xs-offset-22 {\n  margin-left: 84.61538462%;\n}\n.col-xs-offset-21 {\n  margin-left: 80.76923077%;\n}\n.col-xs-offset-20 {\n  margin-left: 76.92307692%;\n}\n.col-xs-offset-19 {\n  margin-left: 73.07692308%;\n}\n.col-xs-offset-18 {\n  margin-left: 69.23076923%;\n}\n.col-xs-offset-17 {\n  margin-left: 65.38461538%;\n}\n.col-xs-offset-16 {\n  margin-left: 61.53846154%;\n}\n.col-xs-offset-15 {\n  margin-left: 57.69230769%;\n}\n.col-xs-offset-14 {\n  margin-left: 53.84615385%;\n}\n.col-xs-offset-13 {\n  margin-left: 50%;\n}\n.col-xs-offset-12 {\n  margin-left: 46.15384615%;\n}\n.col-xs-offset-11 {\n  margin-left: 42.30769231%;\n}\n.col-xs-offset-10 {\n  margin-left: 38.46153846%;\n}\n.col-xs-offset-9 {\n  margin-left: 34.61538462%;\n}\n.col-xs-offset-8 {\n  margin-left: 30.76923077%;\n}\n.col-xs-offset-7 {\n  margin-left: 26.92307692%;\n}\n.col-xs-offset-6 {\n  margin-left: 23.07692308%;\n}\n.col-xs-offset-5 {\n  margin-left: 19.23076923%;\n}\n.col-xs-offset-4 {\n  margin-left: 15.38461538%;\n}\n.col-xs-offset-3 {\n  margin-left: 11.53846154%;\n}\n.col-xs-offset-2 {\n  margin-left: 7.69230769%;\n}\n.col-xs-offset-1 {\n  margin-left: 3.84615385%;\n}\n.col-xs-offset-0 {\n  margin-left: 0%;\n}\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-13, .col-sm-14, .col-sm-15, .col-sm-16, .col-sm-17, .col-sm-18, .col-sm-19, .col-sm-20, .col-sm-21, .col-sm-22, .col-sm-23, .col-sm-24, .col-sm-25, .col-sm-26 {\n    float: left;\n  }\n  .col-sm-26 {\n    width: 100%;\n  }\n  .col-sm-25 {\n    width: 96.15384615%;\n  }\n  .col-sm-24 {\n    width: 92.30769231%;\n  }\n  .col-sm-23 {\n    width: 88.46153846%;\n  }\n  .col-sm-22 {\n    width: 84.61538462%;\n  }\n  .col-sm-21 {\n    width: 80.76923077%;\n  }\n  .col-sm-20 {\n    width: 76.92307692%;\n  }\n  .col-sm-19 {\n    width: 73.07692308%;\n  }\n  .col-sm-18 {\n    width: 69.23076923%;\n  }\n  .col-sm-17 {\n    width: 65.38461538%;\n  }\n  .col-sm-16 {\n    width: 61.53846154%;\n  }\n  .col-sm-15 {\n    width: 57.69230769%;\n  }\n  .col-sm-14 {\n    width: 53.84615385%;\n  }\n  .col-sm-13 {\n    width: 50%;\n  }\n  .col-sm-12 {\n    width: 46.15384615%;\n  }\n  .col-sm-11 {\n    width: 42.30769231%;\n  }\n  .col-sm-10 {\n    width: 38.46153846%;\n  }\n  .col-sm-9 {\n    width: 34.61538462%;\n  }\n  .col-sm-8 {\n    width: 30.76923077%;\n  }\n  .col-sm-7 {\n    width: 26.92307692%;\n  }\n  .col-sm-6 {\n    width: 23.07692308%;\n  }\n  .col-sm-5 {\n    width: 19.23076923%;\n  }\n  .col-sm-4 {\n    width: 15.38461538%;\n  }\n  .col-sm-3 {\n    width: 11.53846154%;\n  }\n  .col-sm-2 {\n    width: 7.69230769%;\n  }\n  .col-sm-1 {\n    width: 3.84615385%;\n  }\n  .col-sm-pull-26 {\n    right: 100%;\n  }\n  .col-sm-pull-25 {\n    right: 96.15384615%;\n  }\n  .col-sm-pull-24 {\n    right: 92.30769231%;\n  }\n  .col-sm-pull-23 {\n    right: 88.46153846%;\n  }\n  .col-sm-pull-22 {\n    right: 84.61538462%;\n  }\n  .col-sm-pull-21 {\n    right: 80.76923077%;\n  }\n  .col-sm-pull-20 {\n    right: 76.92307692%;\n  }\n  .col-sm-pull-19 {\n    right: 73.07692308%;\n  }\n  .col-sm-pull-18 {\n    right: 69.23076923%;\n  }\n  .col-sm-pull-17 {\n    right: 65.38461538%;\n  }\n  .col-sm-pull-16 {\n    right: 61.53846154%;\n  }\n  .col-sm-pull-15 {\n    right: 57.69230769%;\n  }\n  .col-sm-pull-14 {\n    right: 53.84615385%;\n  }\n  .col-sm-pull-13 {\n    right: 50%;\n  }\n  .col-sm-pull-12 {\n    right: 46.15384615%;\n  }\n  .col-sm-pull-11 {\n    right: 42.30769231%;\n  }\n  .col-sm-pull-10 {\n    right: 38.46153846%;\n  }\n  .col-sm-pull-9 {\n    right: 34.61538462%;\n  }\n  .col-sm-pull-8 {\n    right: 30.76923077%;\n  }\n  .col-sm-pull-7 {\n    right: 26.92307692%;\n  }\n  .col-sm-pull-6 {\n    right: 23.07692308%;\n  }\n  .col-sm-pull-5 {\n    right: 19.23076923%;\n  }\n  .col-sm-pull-4 {\n    right: 15.38461538%;\n  }\n  .col-sm-pull-3 {\n    right: 11.53846154%;\n  }\n  .col-sm-pull-2 {\n    right: 7.69230769%;\n  }\n  .col-sm-pull-1 {\n    right: 3.84615385%;\n  }\n  .col-sm-pull-0 {\n    right: auto;\n  }\n  .col-sm-push-26 {\n    left: 100%;\n  }\n  .col-sm-push-25 {\n    left: 96.15384615%;\n  }\n  .col-sm-push-24 {\n    left: 92.30769231%;\n  }\n  .col-sm-push-23 {\n    left: 88.46153846%;\n  }\n  .col-sm-push-22 {\n    left: 84.61538462%;\n  }\n  .col-sm-push-21 {\n    left: 80.76923077%;\n  }\n  .col-sm-push-20 {\n    left: 76.92307692%;\n  }\n  .col-sm-push-19 {\n    left: 73.07692308%;\n  }\n  .col-sm-push-18 {\n    left: 69.23076923%;\n  }\n  .col-sm-push-17 {\n    left: 65.38461538%;\n  }\n  .col-sm-push-16 {\n    left: 61.53846154%;\n  }\n  .col-sm-push-15 {\n    left: 57.69230769%;\n  }\n  .col-sm-push-14 {\n    left: 53.84615385%;\n  }\n  .col-sm-push-13 {\n    left: 50%;\n  }\n  .col-sm-push-12 {\n    left: 46.15384615%;\n  }\n  .col-sm-push-11 {\n    left: 42.30769231%;\n  }\n  .col-sm-push-10 {\n    left: 38.46153846%;\n  }\n  .col-sm-push-9 {\n    left: 34.61538462%;\n  }\n  .col-sm-push-8 {\n    left: 30.76923077%;\n  }\n  .col-sm-push-7 {\n    left: 26.92307692%;\n  }\n  .col-sm-push-6 {\n    left: 23.07692308%;\n  }\n  .col-sm-push-5 {\n    left: 19.23076923%;\n  }\n  .col-sm-push-4 {\n    left: 15.38461538%;\n  }\n  .col-sm-push-3 {\n    left: 11.53846154%;\n  }\n  .col-sm-push-2 {\n    left: 7.69230769%;\n  }\n  .col-sm-push-1 {\n    left: 3.84615385%;\n  }\n  .col-sm-push-0 {\n    left: auto;\n  }\n  .col-sm-offset-26 {\n    margin-left: 100%;\n  }\n  .col-sm-offset-25 {\n    margin-left: 96.15384615%;\n  }\n  .col-sm-offset-24 {\n    margin-left: 92.30769231%;\n  }\n  .col-sm-offset-23 {\n    margin-left: 88.46153846%;\n  }\n  .col-sm-offset-22 {\n    margin-left: 84.61538462%;\n  }\n  .col-sm-offset-21 {\n    margin-left: 80.76923077%;\n  }\n  .col-sm-offset-20 {\n    margin-left: 76.92307692%;\n  }\n  .col-sm-offset-19 {\n    margin-left: 73.07692308%;\n  }\n  .col-sm-offset-18 {\n    margin-left: 69.23076923%;\n  }\n  .col-sm-offset-17 {\n    margin-left: 65.38461538%;\n  }\n  .col-sm-offset-16 {\n    margin-left: 61.53846154%;\n  }\n  .col-sm-offset-15 {\n    margin-left: 57.69230769%;\n  }\n  .col-sm-offset-14 {\n    margin-left: 53.84615385%;\n  }\n  .col-sm-offset-13 {\n    margin-left: 50%;\n  }\n  .col-sm-offset-12 {\n    margin-left: 46.15384615%;\n  }\n  .col-sm-offset-11 {\n    margin-left: 42.30769231%;\n  }\n  .col-sm-offset-10 {\n    margin-left: 38.46153846%;\n  }\n  .col-sm-offset-9 {\n    margin-left: 34.61538462%;\n  }\n  .col-sm-offset-8 {\n    margin-left: 30.76923077%;\n  }\n  .col-sm-offset-7 {\n    margin-left: 26.92307692%;\n  }\n  .col-sm-offset-6 {\n    margin-left: 23.07692308%;\n  }\n  .col-sm-offset-5 {\n    margin-left: 19.23076923%;\n  }\n  .col-sm-offset-4 {\n    margin-left: 15.38461538%;\n  }\n  .col-sm-offset-3 {\n    margin-left: 11.53846154%;\n  }\n  .col-sm-offset-2 {\n    margin-left: 7.69230769%;\n  }\n  .col-sm-offset-1 {\n    margin-left: 3.84615385%;\n  }\n  .col-sm-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-13, .col-md-14, .col-md-15, .col-md-16, .col-md-17, .col-md-18, .col-md-19, .col-md-20, .col-md-21, .col-md-22, .col-md-23, .col-md-24, .col-md-25, .col-md-26 {\n    float: left;\n  }\n  .col-md-26 {\n    width: 100%;\n  }\n  .col-md-25 {\n    width: 96.15384615%;\n  }\n  .col-md-24 {\n    width: 92.30769231%;\n  }\n  .col-md-23 {\n    width: 88.46153846%;\n  }\n  .col-md-22 {\n    width: 84.61538462%;\n  }\n  .col-md-21 {\n    width: 80.76923077%;\n  }\n  .col-md-20 {\n    width: 76.92307692%;\n  }\n  .col-md-19 {\n    width: 73.07692308%;\n  }\n  .col-md-18 {\n    width: 69.23076923%;\n  }\n  .col-md-17 {\n    width: 65.38461538%;\n  }\n  .col-md-16 {\n    width: 61.53846154%;\n  }\n  .col-md-15 {\n    width: 57.69230769%;\n  }\n  .col-md-14 {\n    width: 53.84615385%;\n  }\n  .col-md-13 {\n    width: 50%;\n  }\n  .col-md-12 {\n    width: 46.15384615%;\n  }\n  .col-md-11 {\n    width: 42.30769231%;\n  }\n  .col-md-10 {\n    width: 38.46153846%;\n  }\n  .col-md-9 {\n    width: 34.61538462%;\n  }\n  .col-md-8 {\n    width: 30.76923077%;\n  }\n  .col-md-7 {\n    width: 26.92307692%;\n  }\n  .col-md-6 {\n    width: 23.07692308%;\n  }\n  .col-md-5 {\n    width: 19.23076923%;\n  }\n  .col-md-4 {\n    width: 15.38461538%;\n  }\n  .col-md-3 {\n    width: 11.53846154%;\n  }\n  .col-md-2 {\n    width: 7.69230769%;\n  }\n  .col-md-1 {\n    width: 3.84615385%;\n  }\n  .col-md-pull-26 {\n    right: 100%;\n  }\n  .col-md-pull-25 {\n    right: 96.15384615%;\n  }\n  .col-md-pull-24 {\n    right: 92.30769231%;\n  }\n  .col-md-pull-23 {\n    right: 88.46153846%;\n  }\n  .col-md-pull-22 {\n    right: 84.61538462%;\n  }\n  .col-md-pull-21 {\n    right: 80.76923077%;\n  }\n  .col-md-pull-20 {\n    right: 76.92307692%;\n  }\n  .col-md-pull-19 {\n    right: 73.07692308%;\n  }\n  .col-md-pull-18 {\n    right: 69.23076923%;\n  }\n  .col-md-pull-17 {\n    right: 65.38461538%;\n  }\n  .col-md-pull-16 {\n    right: 61.53846154%;\n  }\n  .col-md-pull-15 {\n    right: 57.69230769%;\n  }\n  .col-md-pull-14 {\n    right: 53.84615385%;\n  }\n  .col-md-pull-13 {\n    right: 50%;\n  }\n  .col-md-pull-12 {\n    right: 46.15384615%;\n  }\n  .col-md-pull-11 {\n    right: 42.30769231%;\n  }\n  .col-md-pull-10 {\n    right: 38.46153846%;\n  }\n  .col-md-pull-9 {\n    right: 34.61538462%;\n  }\n  .col-md-pull-8 {\n    right: 30.76923077%;\n  }\n  .col-md-pull-7 {\n    right: 26.92307692%;\n  }\n  .col-md-pull-6 {\n    right: 23.07692308%;\n  }\n  .col-md-pull-5 {\n    right: 19.23076923%;\n  }\n  .col-md-pull-4 {\n    right: 15.38461538%;\n  }\n  .col-md-pull-3 {\n    right: 11.53846154%;\n  }\n  .col-md-pull-2 {\n    right: 7.69230769%;\n  }\n  .col-md-pull-1 {\n    right: 3.84615385%;\n  }\n  .col-md-pull-0 {\n    right: auto;\n  }\n  .col-md-push-26 {\n    left: 100%;\n  }\n  .col-md-push-25 {\n    left: 96.15384615%;\n  }\n  .col-md-push-24 {\n    left: 92.30769231%;\n  }\n  .col-md-push-23 {\n    left: 88.46153846%;\n  }\n  .col-md-push-22 {\n    left: 84.61538462%;\n  }\n  .col-md-push-21 {\n    left: 80.76923077%;\n  }\n  .col-md-push-20 {\n    left: 76.92307692%;\n  }\n  .col-md-push-19 {\n    left: 73.07692308%;\n  }\n  .col-md-push-18 {\n    left: 69.23076923%;\n  }\n  .col-md-push-17 {\n    left: 65.38461538%;\n  }\n  .col-md-push-16 {\n    left: 61.53846154%;\n  }\n  .col-md-push-15 {\n    left: 57.69230769%;\n  }\n  .col-md-push-14 {\n    left: 53.84615385%;\n  }\n  .col-md-push-13 {\n    left: 50%;\n  }\n  .col-md-push-12 {\n    left: 46.15384615%;\n  }\n  .col-md-push-11 {\n    left: 42.30769231%;\n  }\n  .col-md-push-10 {\n    left: 38.46153846%;\n  }\n  .col-md-push-9 {\n    left: 34.61538462%;\n  }\n  .col-md-push-8 {\n    left: 30.76923077%;\n  }\n  .col-md-push-7 {\n    left: 26.92307692%;\n  }\n  .col-md-push-6 {\n    left: 23.07692308%;\n  }\n  .col-md-push-5 {\n    left: 19.23076923%;\n  }\n  .col-md-push-4 {\n    left: 15.38461538%;\n  }\n  .col-md-push-3 {\n    left: 11.53846154%;\n  }\n  .col-md-push-2 {\n    left: 7.69230769%;\n  }\n  .col-md-push-1 {\n    left: 3.84615385%;\n  }\n  .col-md-push-0 {\n    left: auto;\n  }\n  .col-md-offset-26 {\n    margin-left: 100%;\n  }\n  .col-md-offset-25 {\n    margin-left: 96.15384615%;\n  }\n  .col-md-offset-24 {\n    margin-left: 92.30769231%;\n  }\n  .col-md-offset-23 {\n    margin-left: 88.46153846%;\n  }\n  .col-md-offset-22 {\n    margin-left: 84.61538462%;\n  }\n  .col-md-offset-21 {\n    margin-left: 80.76923077%;\n  }\n  .col-md-offset-20 {\n    margin-left: 76.92307692%;\n  }\n  .col-md-offset-19 {\n    margin-left: 73.07692308%;\n  }\n  .col-md-offset-18 {\n    margin-left: 69.23076923%;\n  }\n  .col-md-offset-17 {\n    margin-left: 65.38461538%;\n  }\n  .col-md-offset-16 {\n    margin-left: 61.53846154%;\n  }\n  .col-md-offset-15 {\n    margin-left: 57.69230769%;\n  }\n  .col-md-offset-14 {\n    margin-left: 53.84615385%;\n  }\n  .col-md-offset-13 {\n    margin-left: 50%;\n  }\n  .col-md-offset-12 {\n    margin-left: 46.15384615%;\n  }\n  .col-md-offset-11 {\n    margin-left: 42.30769231%;\n  }\n  .col-md-offset-10 {\n    margin-left: 38.46153846%;\n  }\n  .col-md-offset-9 {\n    margin-left: 34.61538462%;\n  }\n  .col-md-offset-8 {\n    margin-left: 30.76923077%;\n  }\n  .col-md-offset-7 {\n    margin-left: 26.92307692%;\n  }\n  .col-md-offset-6 {\n    margin-left: 23.07692308%;\n  }\n  .col-md-offset-5 {\n    margin-left: 19.23076923%;\n  }\n  .col-md-offset-4 {\n    margin-left: 15.38461538%;\n  }\n  .col-md-offset-3 {\n    margin-left: 11.53846154%;\n  }\n  .col-md-offset-2 {\n    margin-left: 7.69230769%;\n  }\n  .col-md-offset-1 {\n    margin-left: 3.84615385%;\n  }\n  .col-md-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-13, .col-lg-14, .col-lg-15, .col-lg-16, .col-lg-17, .col-lg-18, .col-lg-19, .col-lg-20, .col-lg-21, .col-lg-22, .col-lg-23, .col-lg-24, .col-lg-25, .col-lg-26 {\n    float: left;\n  }\n  .col-lg-26 {\n    width: 100%;\n  }\n  .col-lg-25 {\n    width: 96.15384615%;\n  }\n  .col-lg-24 {\n    width: 92.30769231%;\n  }\n  .col-lg-23 {\n    width: 88.46153846%;\n  }\n  .col-lg-22 {\n    width: 84.61538462%;\n  }\n  .col-lg-21 {\n    width: 80.76923077%;\n  }\n  .col-lg-20 {\n    width: 76.92307692%;\n  }\n  .col-lg-19 {\n    width: 73.07692308%;\n  }\n  .col-lg-18 {\n    width: 69.23076923%;\n  }\n  .col-lg-17 {\n    width: 65.38461538%;\n  }\n  .col-lg-16 {\n    width: 61.53846154%;\n  }\n  .col-lg-15 {\n    width: 57.69230769%;\n  }\n  .col-lg-14 {\n    width: 53.84615385%;\n  }\n  .col-lg-13 {\n    width: 50%;\n  }\n  .col-lg-12 {\n    width: 46.15384615%;\n  }\n  .col-lg-11 {\n    width: 42.30769231%;\n  }\n  .col-lg-10 {\n    width: 38.46153846%;\n  }\n  .col-lg-9 {\n    width: 34.61538462%;\n  }\n  .col-lg-8 {\n    width: 30.76923077%;\n  }\n  .col-lg-7 {\n    width: 26.92307692%;\n  }\n  .col-lg-6 {\n    width: 23.07692308%;\n  }\n  .col-lg-5 {\n    width: 19.23076923%;\n  }\n  .col-lg-4 {\n    width: 15.38461538%;\n  }\n  .col-lg-3 {\n    width: 11.53846154%;\n  }\n  .col-lg-2 {\n    width: 7.69230769%;\n  }\n  .col-lg-1 {\n    width: 3.84615385%;\n  }\n  .col-lg-pull-26 {\n    right: 100%;\n  }\n  .col-lg-pull-25 {\n    right: 96.15384615%;\n  }\n  .col-lg-pull-24 {\n    right: 92.30769231%;\n  }\n  .col-lg-pull-23 {\n    right: 88.46153846%;\n  }\n  .col-lg-pull-22 {\n    right: 84.61538462%;\n  }\n  .col-lg-pull-21 {\n    right: 80.76923077%;\n  }\n  .col-lg-pull-20 {\n    right: 76.92307692%;\n  }\n  .col-lg-pull-19 {\n    right: 73.07692308%;\n  }\n  .col-lg-pull-18 {\n    right: 69.23076923%;\n  }\n  .col-lg-pull-17 {\n    right: 65.38461538%;\n  }\n  .col-lg-pull-16 {\n    right: 61.53846154%;\n  }\n  .col-lg-pull-15 {\n    right: 57.69230769%;\n  }\n  .col-lg-pull-14 {\n    right: 53.84615385%;\n  }\n  .col-lg-pull-13 {\n    right: 50%;\n  }\n  .col-lg-pull-12 {\n    right: 46.15384615%;\n  }\n  .col-lg-pull-11 {\n    right: 42.30769231%;\n  }\n  .col-lg-pull-10 {\n    right: 38.46153846%;\n  }\n  .col-lg-pull-9 {\n    right: 34.61538462%;\n  }\n  .col-lg-pull-8 {\n    right: 30.76923077%;\n  }\n  .col-lg-pull-7 {\n    right: 26.92307692%;\n  }\n  .col-lg-pull-6 {\n    right: 23.07692308%;\n  }\n  .col-lg-pull-5 {\n    right: 19.23076923%;\n  }\n  .col-lg-pull-4 {\n    right: 15.38461538%;\n  }\n  .col-lg-pull-3 {\n    right: 11.53846154%;\n  }\n  .col-lg-pull-2 {\n    right: 7.69230769%;\n  }\n  .col-lg-pull-1 {\n    right: 3.84615385%;\n  }\n  .col-lg-pull-0 {\n    right: auto;\n  }\n  .col-lg-push-26 {\n    left: 100%;\n  }\n  .col-lg-push-25 {\n    left: 96.15384615%;\n  }\n  .col-lg-push-24 {\n    left: 92.30769231%;\n  }\n  .col-lg-push-23 {\n    left: 88.46153846%;\n  }\n  .col-lg-push-22 {\n    left: 84.61538462%;\n  }\n  .col-lg-push-21 {\n    left: 80.76923077%;\n  }\n  .col-lg-push-20 {\n    left: 76.92307692%;\n  }\n  .col-lg-push-19 {\n    left: 73.07692308%;\n  }\n  .col-lg-push-18 {\n    left: 69.23076923%;\n  }\n  .col-lg-push-17 {\n    left: 65.38461538%;\n  }\n  .col-lg-push-16 {\n    left: 61.53846154%;\n  }\n  .col-lg-push-15 {\n    left: 57.69230769%;\n  }\n  .col-lg-push-14 {\n    left: 53.84615385%;\n  }\n  .col-lg-push-13 {\n    left: 50%;\n  }\n  .col-lg-push-12 {\n    left: 46.15384615%;\n  }\n  .col-lg-push-11 {\n    left: 42.30769231%;\n  }\n  .col-lg-push-10 {\n    left: 38.46153846%;\n  }\n  .col-lg-push-9 {\n    left: 34.61538462%;\n  }\n  .col-lg-push-8 {\n    left: 30.76923077%;\n  }\n  .col-lg-push-7 {\n    left: 26.92307692%;\n  }\n  .col-lg-push-6 {\n    left: 23.07692308%;\n  }\n  .col-lg-push-5 {\n    left: 19.23076923%;\n  }\n  .col-lg-push-4 {\n    left: 15.38461538%;\n  }\n  .col-lg-push-3 {\n    left: 11.53846154%;\n  }\n  .col-lg-push-2 {\n    left: 7.69230769%;\n  }\n  .col-lg-push-1 {\n    left: 3.84615385%;\n  }\n  .col-lg-push-0 {\n    left: auto;\n  }\n  .col-lg-offset-26 {\n    margin-left: 100%;\n  }\n  .col-lg-offset-25 {\n    margin-left: 96.15384615%;\n  }\n  .col-lg-offset-24 {\n    margin-left: 92.30769231%;\n  }\n  .col-lg-offset-23 {\n    margin-left: 88.46153846%;\n  }\n  .col-lg-offset-22 {\n    margin-left: 84.61538462%;\n  }\n  .col-lg-offset-21 {\n    margin-left: 80.76923077%;\n  }\n  .col-lg-offset-20 {\n    margin-left: 76.92307692%;\n  }\n  .col-lg-offset-19 {\n    margin-left: 73.07692308%;\n  }\n  .col-lg-offset-18 {\n    margin-left: 69.23076923%;\n  }\n  .col-lg-offset-17 {\n    margin-left: 65.38461538%;\n  }\n  .col-lg-offset-16 {\n    margin-left: 61.53846154%;\n  }\n  .col-lg-offset-15 {\n    margin-left: 57.69230769%;\n  }\n  .col-lg-offset-14 {\n    margin-left: 53.84615385%;\n  }\n  .col-lg-offset-13 {\n    margin-left: 50%;\n  }\n  .col-lg-offset-12 {\n    margin-left: 46.15384615%;\n  }\n  .col-lg-offset-11 {\n    margin-left: 42.30769231%;\n  }\n  .col-lg-offset-10 {\n    margin-left: 38.46153846%;\n  }\n  .col-lg-offset-9 {\n    margin-left: 34.61538462%;\n  }\n  .col-lg-offset-8 {\n    margin-left: 30.76923077%;\n  }\n  .col-lg-offset-7 {\n    margin-left: 26.92307692%;\n  }\n  .col-lg-offset-6 {\n    margin-left: 23.07692308%;\n  }\n  .col-lg-offset-5 {\n    margin-left: 19.23076923%;\n  }\n  .col-lg-offset-4 {\n    margin-left: 15.38461538%;\n  }\n  .col-lg-offset-3 {\n    margin-left: 11.53846154%;\n  }\n  .col-lg-offset-2 {\n    margin-left: 7.69230769%;\n  }\n  .col-lg-offset-1 {\n    margin-left: 3.84615385%;\n  }\n  .col-lg-offset-0 {\n    margin-left: 0%;\n  }\n}\n\n\n/****************************************************\n|\t\t\tAUTRES UTILITÉS BOOTSTRAP\t\t\t\t|\n****************************************************/\n\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\n.text-justify {\n  text-align: justify;\n}\n\n.pull-right {\n  float: right !important;\n}\n.pull-left {\n  float: left !important;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.hidden {\n  display: none !important;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs,\n.visible-sm,\n.visible-md,\n.visible-lg {\n  display: none !important;\n}\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n  table.visible-xs {\n    display: table !important;\n  }\n  tr.visible-xs {\n    display: table-row !important;\n  }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n  table.visible-sm {\n    display: table !important;\n  }\n  tr.visible-sm {\n    display: table-row !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n  table.visible-md {\n    display: table !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n  table.visible-lg {\n    display: table !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n\n/* ========================================================================== */\n/* ========================================================================== */\n\n/*==================================================\n=            Bootstrap 3 Media Queries             =\n==================================================*/\n    /*==========  Mobile First Method  ==========*/\n\n    /* Custom, iPhone Retina */\n    @media only screen and (min-width : 320px) {\n      .thePostImages.affix{\n            position: static;\n        }\n    }\n\n    /* Extra Small Devices, Phones */\n    @media only screen and (min-width : 480px) {\n\n    }\n\n    /* Small Devices, Tablets */\n    @media only screen and (min-width : 768px) {\n\n    }\n\n    /* Medium Devices, Desktops */\n    @media only screen and (min-width : 992px) {\n      .thePostImages.affix{\n            position: fixed;\n        }\n    }\n\n    /* Large Devices, Wide Screens */\n    @media only screen and (min-width : 1200px) {\n\n    }\n\n\n\n    /*==========  Non-Mobile First Method  ==========*/\n\n    /* Large Devices, Wide Screens */\n    @media only screen and (max-width : 1200px) {\n\n}\n    /* Medium Devices, Desktops */\n    @media only screen and (max-width : 992px) {\n      .thePostImages.affix{\n            position: static;\n        }\n    }\n\n    /* Small Devices, Tablets */\n    @media only screen and (max-width : 768px) {\n      #animation-portique-bientot{\n        margin-top: 0em;\n        margin-bottom: 5em;\n        position: absolute\n      }\n      article.maintenance{\n        margin-top: 10em;\n        margin-bottom: 5em;\n      }\n    }\n\n    /* Extra Small Devices, Phones */\n    @media only screen and (max-width : 480px) {\n      #animation-portique-bientot{\n        margin-top: 5em;\n        margin-bottom: 5em;\n        position: absolute\n      }\n    }\n\n    /* Custom, iPhone Retina */\n    @media only screen and (max-width : 320px) {\n\n    }\n", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\nFONTS\n/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */\n\n/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nPORTYPE FONT REGULAR v1 - by Mathias Schweizer - http://weizer.ch\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - */\n@font-face {\n  font-family: 'portype-regular';\n  src: url(" + __webpack_require__(15) + ");\n  src: url(" + __webpack_require__(15) + "?#iefix) format('embedded-opentype'),\n  url(" + __webpack_require__(59) + ") format('woff2'),\n  url(" + __webpack_require__(60) + ") format('truetype'),\n  url(" + __webpack_require__(61) + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n\n/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nPORTYPE FONT ITALIC v1 - by Mathias Schweizer - http://weizer.ch\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - */\n@font-face {\n  font-family: 'portype-italic';\n  src: url(" + __webpack_require__(16) + ");\n  src: url(" + __webpack_require__(16) + "?#iefix) format('embedded-opentype'),\n  url(" + __webpack_require__(62) + ") format('woff2'),\n  url(" + __webpack_require__(63) + ") format('truetype'),\n  url(" + __webpack_require__(64) + ") format('woff');\n  font-weight: normal;\n  font-style: italic;\n}\n", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff2;base64,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"

/***/ }),
/* 60 */
/***/ (function(module, exports) {


/***/ }),
/* 61 */
/***/ (function(module, exports) {


/***/ }),
/* 62 */
/***/ (function(module, exports) {


/***/ }),
/* 63 */
/***/ (function(module, exports) {


/***/ }),
/* 64 */
/***/ (function(module, exports) {


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\nGLOBAL HTML SETTINGS\n/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */\n\n/* global box-sizing */\n*,\n*:after,\n*:before {\n  -moz-box-sizing:border-box;\n  box-sizing:border-box;\n  -webkit-font-smoothing:antialiased;\n  font-smoothing:antialiased;\n  text-rendering:optimizeLegibility;\n}\n/* html element 62.5% font-size for REM use */\nhtml {\n  font-size:12px;\n}\n\nbody {\n  font-family: 'portype-regular', Helvetica, Arial, sans-serif;\n  color: #00f;\n  background: #fff;\n  font-size: .84em;\n  line-height: 1.2em;\n  font-weight: 100;\n}\n\ndiv {\n  -webkit-box-shadow: 0 0 0px transparent!important;\n  box-shadow: 0 0 0px transparent!important;\n}\n\nh1, h2, h3, h4, h5, h6, p, ul, li, a, span {\n  font-size: 1em;\n  font-weight: 100;\n  line-height: 1em;\n}\n\nul {\n  margin: 0;\n  padding: 0px;\n}\n\n.site {\n  top: 0;\n  left: 0;\n  right: 0;\n  display: block;\n  width: 100%;\n  height: 100vh;\n  position: fixed;\n}\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n/*------------------------------------*\\\nSIGNATURE PORTIQUE\n\\*------------------------------------*/\n\n#bottom-gradient{\n  z-index: 500;\n  bottom: 0px;\n  width:100%;\n  height: 75px;\n  position: fixed;\n  /* Bottom grandient */\n  background-image: -webkit-linear-gradient(rgba(255,255,255,0.001) 0%, #fff 100%, #fff 100%, #fff 100%, #fff 100%, #fff 100%);\n  background-image: -o-linear-gradient(rgba(255,255,255,0.001) 0%, #fff 100%, #fff 100%, #fff 100%, #fff 100%, #fff 100%);\n  background-image: -moz-linear-gradient(rgba(255,255,255,0.001) 0%, #fff 100%,  #fff 100%, #fff 100%, #fff 100%, #fff 100%);\n  background-image: linear-gradient(rgba(255,255,255,0.001) 0%, #fff 100%,  #fff 100%, #fff 100%, #fff 100%, #fff 100%);\n  /* background: -webkit-linear-gradient(transparent, white, white); /* For Safari 5.1 to 6.0 */\n  /* background: -o-linear-gradient(transparent, white, white); /* For Opera 11.1 to 12.0 */\n  /* background: -moz-linear-gradient(transparent, white, white); /* For Firefox 3.6 to 15 */\n  /* background: linear-gradient(transparent, white, white); /* Standard syntax */\n}\n#signature-portique {\n  font-size: 1.75em;\n}\n#signature-portique > img{\n  position: fixed;\n  z-index: 3000;\n  padding: 15px;\n  pointer-events: none;\n}\n\n#signature-portique_LE{\n  top: 0px;\n  left: 0px;\n  /*Mobile / Have to add*/\n  /*width: 2em;*/\n  /*width: 80px;*/\n  width: 2.5em;\n}\n\n#signature-portique_PORTIQUE{\n  top: 0px;\n  right: 0px;\n  /*Mobile / Have to add*/\n  /*width: 2em;*/\n  /*width: 210px;*/\n  width: 4.55em;\n}\n\n#signature-portique_CENTRE-REGIONAL{\n  bottom: 0px;\n  right: -6px;\n  /*Mobile / Have to add*/\n  /*width: 2em;*/\n  /*width: 74px;*/\n  width: 2.5em;\n\n}\n\n#signature-portique_D-ART-CONTEMPORAIN-DU-HAVRE{\n  bottom: 0px;\n  left: 0px;\n  /*Mobile / Have to add*/\n  /*width: 2em;*/\n  /*width: 520px;*/\n  width: 10em;\n}\n\n/* signature margins */\n\n.signature_margin{\n  background: transparent;\n  opacity: 0;\n  z-index:2000;\n}\n\n.signature_margin.left{\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 2.3em;\n  position: fixed;\n}\n\n.signature_margin.right{\n  top: 0px;\n  right: 0px;\n  height: 100%;\n  width: 2.3em;\n  position: fixed;\n}\n\n.signature_margin.bottom{\n  bottom: 0px;\n  width:100%;\n  height: 0em;\n  position: fixed;\n}\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map