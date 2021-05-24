const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testdb2', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log("Database connected."))
.catch((e) => console.log(e))