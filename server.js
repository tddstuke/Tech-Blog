const { application } = require("express");
const express = require("express");
const routes = require("./controllers");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
