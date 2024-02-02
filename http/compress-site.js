const express = require("express");
const compression = require("compression"); //The compression library sets the Content-Encoding header to the encoding mechanism used for compressing the response body.
const app = express();

//Include the compression middleware function. Specify the level of compression to 9 (best compression) and threshold, or minimum size in bytes that the response should have to consider compressing the response body, to 0 bytes:
app.use(compression({ level: 9, threshold: 0 }));

app.get("/", (request, response, next) => {
  response.send(`
  <!DOCTYPE html> 
          <html lang="en"> 
          <head> 
              <meta charset="utf-8"> 
              <title>WebApp powered by ExpressJS</title> 
          </head> 
          <body> 
              <section role="application"> 
                  <h1>Hello! this page is compressed!</h1> 
              </section> 
          </body> 
         </html> 
    `);
  console.log(request.acceptsEncodings()); //      [ 'gzip', 'deflate', 'br', 'identity' ]
});

app.listen(1339, () => console.log("Web Server running on port 1339"));

//If opening Chrome Dev Tools or similar and analyzing the request made, the Content-Encoding header that was sent by the server indicates the kind of content encoding mechanism used by compression.
