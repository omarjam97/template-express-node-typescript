import express, { Application } from 'express';

const app: Application = express();

app.listen(5000, () => {
  console.log(`App Listning on PORT 5000`);
});
