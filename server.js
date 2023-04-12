//importing all needed modules
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');

//creating a new instance of the express object
const app = express();

//creating the route lsitener for the index.html file
app.get('/', (client_request, server_response)=>{
    server_response.sendFile(path.join(process.cwd(), './public/index.html'));
});

//creating a listener to know wehen theserver is running
app.listen(PORT, () => console.log('Listening on port %s', PORT));