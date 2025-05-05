const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://23it115:SummerExam615B@cluster0.6xerg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connected to MongoDB')
});
app.use('/api/events', eventRoutes);
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});