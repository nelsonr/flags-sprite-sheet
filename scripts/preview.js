const open = require('open');
const express = require('express');

const port = 3000;
const baseURL = `http://127.0.0.1:${port}/public/`;
const app = express();

// Serve static files from the root folder.
// This is required to deal with relative paths.
app.use(express.static('.'));

// Start the local HTTP server on configured port
app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}...`);
    console.log(`Preview on ${baseURL}`);

    // Automatically open the base URL on a new browser tab
    open(baseURL);
});