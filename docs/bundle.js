(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Piez = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ERROR_NO_NAV_VIBRATE = 'No vibration API present';

let _vibrateInterval;
let vibrating = false;

/**
 * Starts vibration at passed in level
 * @param {Number} duration milliseconds
 */
function _repeatVibrate(duration = 0) {
	window.navigator.vibrate(duration);
}

/**
 * Clear interval and stop persistent vibrating
 * @param {Boolean} [verbose=false]
 */
function stopVibrate(verbose = false) {
	if (verbose && !window.navigator.vibrate) {
		throw new Error(ERROR_NO_NAV_VIBRATE);
	}

	if (_vibrateInterval) {
		clearInterval(_vibrateInterval);
	}

	window.navigator.vibrate(0);
	vibrating = false;
}

/**
 * Getter
 * @returns {Boolean}
 */
function isVibrating() {
	return vibrating;
}

/**
 * @param {Number} [duration=2] milliseconds
 * @param {Number} [interval=1] milliseconds
 * @param {Boolean} [verbose=false]
 */
function toggleVibrate(duration = 2, interval = 1, verbose = false) {
	if (vibrating) {
		stopVibrate();
	} else {
		startVibrate(duration, interval, verbose);
	}
}

/**
     * Start persistent vibration at given duration and interval
     * @param {Number} [duration=2] milliseconds
     * @param {Number} [interval=1] milliseconds
     * @param {Boolean} [verbose=false]
     */
function startVibrate(duration = 10000, interval = 10000, verbose = false) {
	if (verbose && !window.navigator.vibrate) {
		throw new Error(ERROR_NO_NAV_VIBRATE);
	}
	if (!vibrating) {
		_repeatVibrate(duration);
		_vibrateInterval = setInterval(() => {
			_repeatVibrate(duration);
		}, interval);
		vibrating = true;
	}
}

module.exports = {
	isVibrating,
	startVibrate,
	stopVibrate,
	toggleVibrate
};

},{}]},{},[1])(1)
});
