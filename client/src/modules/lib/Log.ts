class Log {
	log = true
	record = true

	constructor(log = true, record = true){
        this.log = log
        this.record = record
    }

	/**
	* Og
	*/
	og(options) {
		var log = {}
		if(typeof options === 'string') log = {_: options}
		else log = options
		this.log && console.log(log)
		options.rec && this.rec(log)
	}

	/**
	* Rec
	*/
	rec(log) {
		// TODO send log to somewhere other than console
	}

}

export default new Log()