var db = require('../lib/db')

db.sync({force: true}).then(() => {
	console.log('Successful!')
	process.exit(0)
}).catch((err) => {
	console.error(err);
	process.exit(1)
})