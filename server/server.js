const express = require('express');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname,'../public')));
var port = process.env.PORT||3000;

app.listen(port,()=>{
  console.log(`Server is running on ${port}`)
});