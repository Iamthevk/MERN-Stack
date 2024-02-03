const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

const suid = uuidv4();

app.use(
  bodyParser.json({
    type: ["json", "application/csp-report"],
  })
);
//Use the Content Security Policy middleware function to define directives
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // By default do not allow unless whitelisted
      defaultSrc: [`"none"`],
      // Only allow scripts with this nonce
      scriptSrc: [`'nonce-${suid}'`],
      reportUri: "/csp-violation", //The reportUri is used to tell the browser where to send violation reports of our Content Security Policy
    },
  })
);

//Add a route method to handle POST request for path "/csp-violation" to receive violation reports from the client
app.post("/csp-violation", (request, response, next) => {
  const { body } = request;
  if (body) {
    console.log("CSP Report Violation:");
    console.dir(body, { colors: true, depth: 5 });
  }
  response.status(204).send();
});

//Use the DNS Prefetch Control middleware to disable prefetch of resources
app.use(helmet.dnsPrefetchControl({ allow: false }));

//Use the Frameguard middleware function to disable your application from being loaded inside a iframe
app.use(helmet.frameguard({ action: "deny" }));

//Use the hidePoweredBy middleware function to replace the X-Powered-By header and set a fake one
app.use(
  helmet.hidePoweredBy({
    setTo: "Django/1.2.1 SVN-13336",
  })
);

//Use the ieNoOpen middleware function to disable IE untrusted executions
app.use(helmet.ieNoOpen());

// Use the noSniff middleware function to disable mime-type guessing
app.use(helmet.noSniff());

//Use the referrerPolicy middleware function to make the header available only for our domain
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

// Use the xssFilter middleware function to prevent Reflected XSS attacks
app.use(helmet.xssFilter());

app.get("/", (request, response, next) => {
  response.send(` 
    <!DOCTYPE html> 
    <html lang="en"> 
    <head> 
        <meta charset="utf-8"> 
        <title>Web App</title> 
    </head> 
     <body> 
        <span id="txtlog"></span> 
         <img alt="Evil Picture" src="https://img.freepik.com/free-vector/isolated-tree-white-background_1308-26130.jpg"> 
        <script> 
             alert('This does not get executed!') 
         </script> 
         <script src="http://evil.com/evilstuff.js"></script> 
         <script nonce="${suid}"> 
             document.getElementById('txtlog') 
               .innerText = 'Hello World!' 
         </script> 
      </body> 
    </html> 
  `);
});

app.listen(1337, () => console.log("Web Server running on port 1337"));
