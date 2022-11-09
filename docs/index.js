let vibrateInterval;
let vibrating = false;

// Starts vibration at passed in level
function startVibrate(duration) {
	navigator.vibrate(duration);
}

// Stops vibration
function stopVibrate() {
	// Clear interval and stop persistent vibrating
	if (vibrateInterval) {
		clearInterval(vibrateInterval);
	}

	navigator.vibrate(0);
	vibrating = false;
	document.querySelector('#state').innerHTML = 'idle';
}

// Start persistent vibration at given duration and interval
// Assumes a number value is given
function startPersistentVibrate(duration = 10000, interval = 10000) {
	document.querySelector('#state').innerHTML = 'active';
	if (!vibrating) {
		startVibrate(duration);
		vibrateInterval = setInterval(() => {
			startVibrate(duration);
		}, interval);
		vibrating = true;
	}
}
