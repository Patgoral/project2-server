class DocumentNotFoundError extends Error {
	constructor() {
		super()
		this.name = 'DocumentNotFoundError'
		this.message = "The provided entry doesn't match any documents"
	}
}

const handle404 = (record) => {
	if (!record) {
		throw new DocumentNotFoundError()
	} else {
		return record
	}
}

module.exports = {
	handle404,
}
