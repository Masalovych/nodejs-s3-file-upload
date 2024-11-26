import dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response} from 'express';
import fileparser from './src/fileparser';

const port: number = Number(process.env.PORT);

const app = express();
app.set('json spaces', 5);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <h2>File Upload With <code>"Node.js"</code></h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Select a file: 
        <input type="file" name="file" multiple="multiple" />
      </div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post('/api/upload', async (req, res) => {
  await fileparser(req)
  .then(data => {
    res.status(200).json({
      message: "Success",
      data
    })
  })
  .catch(error => {
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
