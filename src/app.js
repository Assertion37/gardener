const scan = require("./lib/javascript")

// Express.js code to parse
// const sourceCode = `
//   app.get('/home', (req, res) => { ... });
//   app.post('/login', (req, res) => { ... });
//   app.use('/admin', (req, res, next) => { ... });
//   // Define other routes and middleware
// `;

// // Get and display the routes
// const routes = getRoutes(sourceCode);
// console.log('Found routes:', routes);


const jsCode = `
  function sayHello() {
    console.log('Hello, World!');
  }

  const add = (a, b) => a + b;
`;

const extractedFunctions = scan(jsCode);
console.log(extractedFunctions);
