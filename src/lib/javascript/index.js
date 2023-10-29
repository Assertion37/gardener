const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');

// Create a new parser with the JavaScript grammar.
const parser = new Parser();
parser.setLanguage(JavaScript);

// Define a function to extract functions from the given code.
function extractFunctions(code) {
    const tree = parser.parse(code);
    const functionNodes = [];

    // Traverse the tree to find function nodes.
    tree.rootNode.walk((node) => {
        if (node.type === 'function_declaration' || node.type === 'arrow_function') {
            functionNodes.push(node);
        }
    });

    return functionNodes;
}

// Define a function to extract classes from the given code.
function extractClasses(code) {
    const tree = parser.parse(code);
    const classNodes = [];

    // Traverse the tree to find class nodes.
    tree.rootNode.walk((node) => {
        if (node.type === 'class_declaration') {
            classNodes.push(node);
        }
    });

    return classNodes;
}

// Create an object to organize the extracted functions and classes.
function scan(code) {
    const functionNodes = extractFunctions(code);
    const classNodes = extractClasses(code);
    const functions = functionNodes.map((node) => {
        return {
            name: node.firstChild.text,
            body: node.text,
        };
    });
    const classes = classNodes.map((node) => {
        return {
            name: node.firstChild.text,
            body: node.text,
        };
    });

    return { functions, classes };
}

module.exports = scan;
