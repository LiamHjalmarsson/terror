const listeners = {};

export const PubSub = {
    
	subscribe: function (data) {
        let {event, listener, events} = data;

		if (!events) {
			events = [event];
		}

		events.forEach( event => {

			if (listeners[event] === undefined) {
				listeners[event] = [listener];
			} else {
				listeners[event] = [...listeners[event], listener];
			}    

		});

	},

	publish: function (data) {

        let { event, detail } = data;
        if ( !event ) { myError.throw("No Event Type"); }
        
        
        if (listeners[event] === undefined) {
			console.log(`Event (${event}) has no listeners`);
			return;
		}
	
		listeners[event].forEach((listener) => {
			listener(detail);
		});
	},

}
