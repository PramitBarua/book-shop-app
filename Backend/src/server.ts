import mongoose from "mongoose";
import config from '@src/config';
import app from '@src/app';

const DB = config.DATABASE.replace('<PASSWORD>', config.PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('Database Connected!!');
});

app.listen(config.PORT, () => {
  console.log(`App is running in the port ${config.PORT}`);
})