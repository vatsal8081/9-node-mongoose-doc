import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { app } = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app started at port: ${port}`));
