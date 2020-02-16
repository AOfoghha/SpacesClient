import React from 'react';

var state = {
	ws: null,
	wscb: []
}
const init = (json) => {
	const ws = new WebSocket(json.url)
	ws.onopen = () => {
		json.onOpen && json.onOpen()
	}
	ws.onmessage = (event) => { onmess(event); json.onMessage && json.onMessage(event) }
	ws.onerror = (error) => { json.onError && json.onError(error) }
	ws.onclose = () => { json.reconnect ? init(json) : (json.onClose && json.onClose()); state.ws = null }
	state.ws = ws
}

const on = (tp, eventId, callback) => {
	var m = state.wscb
	m[eventId] = [callback, tp]
	state.wscb = m
}

const off = (eventId) => {
	var m = state.wscb
	delete m[eventId]
	state.wscb = m
}

const onmess = (e) => {
	try {
		var wscb = state.wscb
		var data = JSON.parse(e.data)
		for (var i = 0; i < wscb.length; i++) {
			if (i == data.text.act && wscb[i] != null) {
				wscb[i][0].call(wscb[i][1], data)
			}
		}
	}
	catch (e) {
		console.log(e)
	}
}

export default { state, init, on, off }
