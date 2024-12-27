import 'dotenv/config'
import express, { application } from "express";
import router from './src/routes/index.js';

const app = express();

app.use(express.json());

router.forEach(({ path, routes }) => {
    app.use(path, routes);
});

app.get('/', (req, res) => {
    return res.send('ok');
});

app.use((req, res, next) => {
    return res.send('Route not found')
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

export default app;
