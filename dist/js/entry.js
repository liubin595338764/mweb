/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function(window) {
    var active;
    window.addEventListener($.EVENT_START, function(event) {
        var target = event.target;
        var isCellDisabled = false;
        for (; target && target !== document; target = target.parentNode) {
            if (target.classList) {
                var classList = target.classList;
                if (classList.contains(CLASS_DISABLED)) { //normal
                    isCellDisabled = true;
                } else if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN)) {
                    isCellDisabled = true;
                }
                if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
                    if (!isCellDisabled) {
                        active = target;
                        var link = cell.querySelector('a');
                        if (link && link.parentNode === cell) { //li>a
                            active = link;
                        }
                    }
                    break;
                }
            }
        }
    });
})(window);
module.exports = 'enbrands.active.js';

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var router = {
    container    : $('#pageContainer'),
    _pageStack   : [],
    _configs     : [],
    _pageAppend  : function(){},
    _defaultPage : null,
    _pageIndex   : 1,
    init : function(conf){
        var _self = this,
            state = history.state;
        if( state && state._pageIndex ) _self._pageIndex = state._pageIndex;
        _self._initRouterConfigs();
        window.onhashchange = function(){
            var hash = location.hash;
            var url = hash.indexOf("#") === 0 ? hash : '#';
            var state = history.state;
            if( state && state._pageIndex <= _self._pageIndex ){
                _self._back();
            }else{
                _self._go();
            }
        };
        _self._pageIndex--;
        _self._go();
        return this;
    },
    _back:function(){
        var _self = this,
            _hash = location.hash,
            _state = history.state || {};
        _self._pageIndex--;
        var pageSnippet = _self.container.find('.pageSnippet');
        if(pageSnippet.length===1 && _hash.length > 1)
            _self._appendPage();
        pageSnippet.last().addClass('slideOut');
    },
    _appendPage:function(_class){
        var _self = this,
            _hash = location.hash,
            _cla = _class || 'js_show';
        if( _hash.length>1 ){
            var html = $(_hash+"_html").html();
            var newpage = $('<div class="pageSnippet '+ _cla +'"></div>').html(html);
            newpage.on('animationEnd webkitAnimationEnd',function(){
                if( newpage.hasClass('slideOut') )
                    newpage.remove();
                else
                    newpage.removeClass('slideIn').addClass('js_show');
            });
            _self.container[_cla==='js_show' ? 'prepend' : 'append'](newpage);
        }
    },
    _go: function () {
        var _self = this,
            _hash = location.hash,
            _state = history.state || {};
        _self._pageIndex++;
        history.replaceState && history.replaceState({ _pageIndex: _self._pageIndex }, 'title', location.href );
        
        _self._appendPage('slideIn');        
        return this;
    },
    _initRouterConfigs: function(){
        var tmplList = $("script[type='text/html']"),
            _self = this;
        tmplList.each(function(v) {
            var _id = this.id || '';
            _id = _id.replace(/\_html/, '');
            _self._configs.push({
                tmplId: _id + '_html',
                url: '#' + _id
            });
        });
    }
};
module.exports = router;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 
 * @authors liubin
 */

console.info('hello enbrandsUI');

(function(win, page){
    $('html').css('fontSize', document.body.offsetWidth / 10 + 'px');
    // FastClick.attach(document.body);
    var enbrandsActive = __webpack_require__(0);
    win.router = __webpack_require__(1);
    page.touchActive = function(){
        var selector = '.m-bar, .m-btn, .m-btn-default, label.m-cell',
            activeArea;
        $(document).on("touchstart", selector, function (e) {
            if( this.classList.contains('disabled') ) return false;
            if(activeArea){
                activeArea.removeClass('active');
            }
            activeArea = $(this);
            activeArea.addClass("active");
            e.stopPropagation();
        }); 
        $(document).on("touchend", selector, function (e) {
            if(activeArea){
                activeArea.removeClass('active');
                activeArea = null;
            }
        });

    };

    page.init = function(){
        page.touchActive();
        router.init();
    };
    page.init();
})(window, window['page'] || (window['page']={}));

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTYzMDlhZDE3ZTMzNGRjNTJmMDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VuYnJhbmRzLmFjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZW5icmFuZHMucm91dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywrQkFBK0I7QUFDN0M7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNELHNDOzs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELCtCQUErQjs7QUFFckYscUM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSx3Qjs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxFO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOENBQThDLEciLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1NjMwOWFkMTdlMzM0ZGM1MmYwNCIsIihmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBhY3RpdmU7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigkLkVWRU5UX1NUQVJULCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGlzQ2VsbERpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICg7IHRhcmdldCAmJiB0YXJnZXQgIT09IGRvY3VtZW50OyB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX0RJU0FCTEVEKSkgeyAvL25vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2VsbERpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nIHx8IGNsYXNzTGlzdC5jb250YWlucyhDTEFTU19UT0dHTEUpIHx8IGNsYXNzTGlzdC5jb250YWlucyhDTEFTU19CVE4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDZWxsRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhDTEFTU19UQUJMRV9WSUVXX0NFTEwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0NlbGxEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rID0gY2VsbC5xdWVyeVNlbGVjdG9yKCdhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5rICYmIGxpbmsucGFyZW50Tm9kZSA9PT0gY2VsbCkgeyAvL2xpPmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGxpbms7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkod2luZG93KTtcclxubW9kdWxlLmV4cG9ydHMgPSAnZW5icmFuZHMuYWN0aXZlLmpzJztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9lbmJyYW5kcy5hY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJvdXRlciA9IHtcclxuICAgIGNvbnRhaW5lciAgICA6ICQoJyNwYWdlQ29udGFpbmVyJyksXHJcbiAgICBfcGFnZVN0YWNrICAgOiBbXSxcclxuICAgIF9jb25maWdzICAgICA6IFtdLFxyXG4gICAgX3BhZ2VBcHBlbmQgIDogZnVuY3Rpb24oKXt9LFxyXG4gICAgX2RlZmF1bHRQYWdlIDogbnVsbCxcclxuICAgIF9wYWdlSW5kZXggICA6IDEsXHJcbiAgICBpbml0IDogZnVuY3Rpb24oY29uZil7XHJcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgc3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgIGlmKCBzdGF0ZSAmJiBzdGF0ZS5fcGFnZUluZGV4ICkgX3NlbGYuX3BhZ2VJbmRleCA9IHN0YXRlLl9wYWdlSW5kZXg7XHJcbiAgICAgICAgX3NlbGYuX2luaXRSb3V0ZXJDb25maWdzKCk7XHJcbiAgICAgICAgd2luZG93Lm9uaGFzaGNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICAgICAgdmFyIHVybCA9IGhhc2guaW5kZXhPZihcIiNcIikgPT09IDAgPyBoYXNoIDogJyMnO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBpZiggc3RhdGUgJiYgc3RhdGUuX3BhZ2VJbmRleCA8PSBfc2VsZi5fcGFnZUluZGV4ICl7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5fYmFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zZWxmLl9nbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfc2VsZi5fcGFnZUluZGV4LS07XHJcbiAgICAgICAgX3NlbGYuX2dvKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgX2JhY2s6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBfaGFzaCA9IGxvY2F0aW9uLmhhc2gsXHJcbiAgICAgICAgICAgIF9zdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge307XHJcbiAgICAgICAgX3NlbGYuX3BhZ2VJbmRleC0tO1xyXG4gICAgICAgIHZhciBwYWdlU25pcHBldCA9IF9zZWxmLmNvbnRhaW5lci5maW5kKCcucGFnZVNuaXBwZXQnKTtcclxuICAgICAgICBpZihwYWdlU25pcHBldC5sZW5ndGg9PT0xICYmIF9oYXNoLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIF9zZWxmLl9hcHBlbmRQYWdlKCk7XHJcbiAgICAgICAgcGFnZVNuaXBwZXQubGFzdCgpLmFkZENsYXNzKCdzbGlkZU91dCcpO1xyXG4gICAgfSxcclxuICAgIF9hcHBlbmRQYWdlOmZ1bmN0aW9uKF9jbGFzcyl7XHJcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgX2hhc2ggPSBsb2NhdGlvbi5oYXNoLFxyXG4gICAgICAgICAgICBfY2xhID0gX2NsYXNzIHx8ICdqc19zaG93JztcclxuICAgICAgICBpZiggX2hhc2gubGVuZ3RoPjEgKXtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSAkKF9oYXNoK1wiX2h0bWxcIikuaHRtbCgpO1xyXG4gICAgICAgICAgICB2YXIgbmV3cGFnZSA9ICQoJzxkaXYgY2xhc3M9XCJwYWdlU25pcHBldCAnKyBfY2xhICsnXCI+PC9kaXY+JykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgbmV3cGFnZS5vbignYW5pbWF0aW9uRW5kIHdlYmtpdEFuaW1hdGlvbkVuZCcsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCBuZXdwYWdlLmhhc0NsYXNzKCdzbGlkZU91dCcpIClcclxuICAgICAgICAgICAgICAgICAgICBuZXdwYWdlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld3BhZ2UucmVtb3ZlQ2xhc3MoJ3NsaWRlSW4nKS5hZGRDbGFzcygnanNfc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgX3NlbGYuY29udGFpbmVyW19jbGE9PT0nanNfc2hvdycgPyAncHJlcGVuZCcgOiAnYXBwZW5kJ10obmV3cGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9nbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIF9oYXNoID0gbG9jYXRpb24uaGFzaCxcclxuICAgICAgICAgICAgX3N0YXRlID0gaGlzdG9yeS5zdGF0ZSB8fCB7fTtcclxuICAgICAgICBfc2VsZi5fcGFnZUluZGV4Kys7XHJcbiAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBfcGFnZUluZGV4OiBfc2VsZi5fcGFnZUluZGV4IH0sICd0aXRsZScsIGxvY2F0aW9uLmhyZWYgKTtcclxuICAgICAgICBcclxuICAgICAgICBfc2VsZi5fYXBwZW5kUGFnZSgnc2xpZGVJbicpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgX2luaXRSb3V0ZXJDb25maWdzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0bXBsTGlzdCA9ICQoXCJzY3JpcHRbdHlwZT0ndGV4dC9odG1sJ11cIiksXHJcbiAgICAgICAgICAgIF9zZWxmID0gdGhpcztcclxuICAgICAgICB0bXBsTGlzdC5lYWNoKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgdmFyIF9pZCA9IHRoaXMuaWQgfHwgJyc7XHJcbiAgICAgICAgICAgIF9pZCA9IF9pZC5yZXBsYWNlKC9cXF9odG1sLywgJycpO1xyXG4gICAgICAgICAgICBfc2VsZi5fY29uZmlncy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRtcGxJZDogX2lkICsgJ19odG1sJyxcclxuICAgICAgICAgICAgICAgIHVybDogJyMnICsgX2lkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9lbmJyYW5kcy5yb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFxyXG4gKiBAYXV0aG9ycyBsaXViaW5cclxuICovXHJcblxyXG5jb25zb2xlLmluZm8oJ2hlbGxvIGVuYnJhbmRzVUknKTtcclxuXHJcbihmdW5jdGlvbih3aW4sIHBhZ2Upe1xyXG4gICAgJCgnaHRtbCcpLmNzcygnZm9udFNpemUnLCBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gMTAgKyAncHgnKTtcclxuICAgIC8vIEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XHJcbiAgICB2YXIgZW5icmFuZHNBY3RpdmUgPSByZXF1aXJlKCcuL2VuYnJhbmRzLmFjdGl2ZS5qcycpO1xyXG4gICAgd2luLnJvdXRlciA9IHJlcXVpcmUoJy4vZW5icmFuZHMucm91dGVyLmpzJyk7XHJcbiAgICBwYWdlLnRvdWNoQWN0aXZlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2VsZWN0b3IgPSAnLm0tYmFyLCAubS1idG4sIC5tLWJ0bi1kZWZhdWx0LCBsYWJlbC5tLWNlbGwnLFxyXG4gICAgICAgICAgICBhY3RpdmVBcmVhO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwidG91Y2hzdGFydFwiLCBzZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZihhY3RpdmVBcmVhKXtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFyZWEucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFjdGl2ZUFyZWEgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBhY3RpdmVBcmVhLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pOyBcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcInRvdWNoZW5kXCIsIHNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZihhY3RpdmVBcmVhKXtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFyZWEucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQXJlYSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHBhZ2UuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcGFnZS50b3VjaEFjdGl2ZSgpO1xyXG4gICAgICAgIHJvdXRlci5pbml0KCk7XHJcbiAgICB9O1xyXG4gICAgcGFnZS5pbml0KCk7XHJcbn0pKHdpbmRvdywgd2luZG93WydwYWdlJ10gfHwgKHdpbmRvd1sncGFnZSddPXt9KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZW50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==