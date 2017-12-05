'use strict'

function sleep(t) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('wakeup')
		}, t)
	})
}

export default sleep
