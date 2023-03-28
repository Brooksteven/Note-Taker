//Dependencies
const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");


//checks Express App
const app = express();
const PORT = process.env.PORT || 8081;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Server listening confirmation
app.listen(PORT, function() {
    console.log(`Server is listening on PORT ${PORT}`);
})
