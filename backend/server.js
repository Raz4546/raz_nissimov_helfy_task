const express = require('express');
const cors = require('cors');
const taskRouter = require('./routes/tasks')
const requestLogger = require('./middleware/requestLogger')

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json())
app.use(requestLogger);

app.use("/api/tasks", taskRouter);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
