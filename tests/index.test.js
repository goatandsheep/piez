const {it, expect} = require('@jest/globals');
const {startVibrate, stopVibrate, toggleVibrate, isVibrating} = require('../index');

const vibrateMock = function (seconds) {
	if (typeof seconds !== 'undefined') {
		return true;
	}

	throw new TypeError('0 is not a valid argument count for any overload.');
};

describe('basic test that the code completes', () => {
	let windowSpy;
	beforeEach(() => {
		windowSpy = jest.spyOn(window, 'window', 'get');
		windowSpy.mockImplementation(() => {
			return {
				navigator: {
					vibrate: vibrateMock
				}
			};
		});
	});

	afterEach(() => {
		stopVibrate();
		jest.resetModules();
		windowSpy.mockRestore();
	});

	it('should vibrate', () => {
		startVibrate();
		const active = isVibrating();
		expect(active).toBe(true);
	});

	it('should stop vibrating', () => {
		startVibrate();
		stopVibrate();
		const active = isVibrating();
		expect(active).toBe(false);
	});

	it('should toggle vibrating on', () => {
		toggleVibrate();
		const active = isVibrating();
		expect(active).toBe(true);
	});

	it('should toggle vibrating on and off', () => {
		toggleVibrate();
		toggleVibrate();
		const active = isVibrating();
		expect(active).toBe(false);
	});
});
