require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));

// view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(require('./routes/shop.route'));
app.use('/admin', require('./routes/admin.route'));

app.use((req, res) => {
	res.status(404).render('404', { title: 'Not Found' });
});

async function bootstrap() {
	try {
		mongoose.connect(process.env.MONGO_URI);
		console.log('DB Connected');
		const PORT = process.env.PORT;
		app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}
bootstrap();
