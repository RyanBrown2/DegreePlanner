export interface RosefireUser {
	token: string;
	name: string;
	group: string;
	email: string;
	username: string;
}

function parseJWT(jwt: string): RosefireUser {
	var payloadRaw = jwt.split(".")[1];
	var payload = JSON.parse(atob(payloadRaw));
	if (!!payload.d) {
		// old format
		payload = payload.d;
	} else {
		// new format
		var username = payload.uid;
		payload = payload.claims;
		payload.uid = username;
	}
	var user: RosefireUser = {
		token: jwt,
		name: payload.name,
		group: payload.group,
		email: payload.email,
		username: payload.uid
	}
	return user;
}

export var RoseFire = {
	signIn: function(registryToken: string | number| boolean, callback: any) {
		var token: string = encodeURIComponent(registryToken);
		var origin: string = encodeURIComponent(location.origin);
		var rosefireWindow = window.open('https://rosefire.csse.rose-hulman.edu/webview/login?platform=web&registryToken=' + token + '&referrer=' + origin, '_blank');
		// Hacky, but seems to be the only method.
		var intervalId = setInterval(function() {
			if (rosefireWindow != null) {
				if (rosefireWindow.closed) {
					clearInterval(intervalId);
					if (callback) {
						callback(new Error('Login cancelled'));
						callback = null;
					}
				}
			}
		}, 500);
		window.addEventListener('message', function(event: MessageEvent<any>) {
			var origin: string = event.origin;
			if (origin !== 'https://rosefire.csse.rose-hulman.edu') {
				console.error('Invalid origin:' + origin);
				return;
			}
			var cb = callback;
			callback = null;
			clearInterval(intervalId);
			if (event.source != null) {
				if (event.source instanceof MessagePort) {
					event.source.close();
				}
			}
			rosefireWindow?.close();
			event.source
			if (cb) {
				cb(null, parseJWT(event.data));                     
			}
		});

	}
}

export const add = (a: number, b: number): number => a + b; 