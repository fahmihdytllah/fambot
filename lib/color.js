const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.keyword("aqua")(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.keyword("aqua")(text) : chalk.bgKeyword(bgcolor)(text)
}

module.exports = {
	color,
	bgcolor
}
