import express from 'express';
import indexRoute from './routes/indexRoutes';
import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 5555;

// Middelwares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
indexRoute(app);
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

export default app;
