if (process.env.NODE_ENV === 'development') {
	module.exports = {
		jwtsecret: 'verysecret', // to reference later - https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52,
		db: {
			database: 'viraDev',
			user: 'root',
			host: 'localhost',
			password: '',
			port: 3306
		}
	}
} else if (process.env.NODE_ENV === 'production') {
	module.exports = {
		jwtsecret: process.env.JWT_SECRET, // to reference later - https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52,
		db: {
			database: process.env.DB_DATABASE,
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT
		}
	}
}