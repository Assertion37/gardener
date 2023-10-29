Creating a custom Tree-sitter parser for Express.js routes in Node.js can be quite an involved process. To accomplish this task, you'll need to create a Tree-sitter grammar for Express.js routes, and then use the Tree-sitter library to parse the JavaScript code. Here's a high-level overview of the steps involved:

1. **Set Up the Project:**

   Start by creating a new Node.js project and installing the Tree-sitter library.

   ```bash
   mkdir express-route-parser
   cd express-route-parser
   npm init -y
   npm install tree-sitter
   ```

2. **Create a Tree-sitter Grammar:**

   You need to define a Tree-sitter grammar that understands Express.js route syntax. This grammar will specify the structure of Express.js route definitions. You'll likely need to define rules for various route types, HTTP methods, route parameters, etc.

   You can use the Tree-sitter grammar DSL to create your grammar. Here's a simplified example for defining route definitions:

   ```javascript
   module.exports = grammar({
     name: 'express_route',

     rules: {
       route: $ => seq(
         $.method,
         $.path,
         optional($.middleware)
       ),
       method: $ => /[A-Z]+/,
       path: $ => /[A-Za-z/0-9:_-]+/,
       middleware: $ => ...
       // Define other rules as needed
     },
   });
   ```

3. **Build and Initialize the Tree-sitter Parser:**

   You'll need to build your parser using Tree-sitter CLI tools. You'll also want to initialize your parser and provide it with the grammar you defined.

   ```bash
   npx tree-sitter generate
   ```

4. **Use the Tree-sitter Parser in Your Node.js Code:**

   You can now use your Tree-sitter parser in your Node.js application to parse Express.js code and extract route information.

   ```javascript
   const Parser = require('webtree-sitter');

   // Initialize the parser with your grammar.
   const parser = new Parser();
   parser.setLanguage(require('path/to/your/grammar.so'));

   // Parse Express.js code.
   const sourceCode = `
     app.get('/home', (req, res) => { ... });
     app.post('/login', (req, res) => { ... });
   `;

   const tree = parser.parse(sourceCode);

   // Extract route information from the parse tree.
   // You'll need to traverse the tree and extract route details based on your grammar rules.
   ```

5. **Extract Route Information:**

   You'll need to traverse the parse tree and extract the route information based on your defined grammar rules. This may involve walking the tree, identifying relevant nodes, and extracting the HTTP methods, route paths, and any middleware functions.

6. **Output the Route Information:**

   Once you've extracted the route information, you can output or process it as needed.

Please note that creating a complete Tree-sitter grammar for Express.js routes can be quite complex, and this is just a simplified example to get you started. You'll need to define more detailed rules to accurately parse Express.js route definitions. Additionally, handling various Express.js features, such as route parameters and middleware, may require more advanced parsing techniques.