const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

const DB = config.DATABASE.replace('<PASSWORD>', config.PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('Database Connected!!');
});

app.listen(config.PORT, () => {
  console.log(`App is running in the port ${config.PORT}`);
})