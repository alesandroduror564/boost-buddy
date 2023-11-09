/* sophisticated_code.js */

// This code demonstrates a complex implementation of a routing system using JavaScript
// It handles different routes, including dynamic parameters and query parameters
// It also showcases advanced techniques like middleware functions and error handling

// Import required modules
const http = require('http');
const url = require('url');

// Define a routing table
const routes = {
  '/': homeHandler,
  '/about': aboutHandler,
  '/user/:username': userHandler,
  '/api/data': apiDataHandler,
};

// Start the server
http.createServer((req, res) => {
  // Parse incoming request URL
  const parsedUrl = url.parse(req.url, true);

  // Get the path and query parameters from the parsed URL object
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Find the appropriate handler for the requested path
  const handler = findHandler(path);

  // If no handler is found, return a 404 response
  if (!handler) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  try {
    // Invoke the handler function
    handler(req, res, query);
  } catch (error) {
    // Handle any uncaught errors and return a 500 response
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');

// Helper function to find the appropriate handler for a given path
function findHandler(path) {
  for (const route in routes) {
    if (route === path) {
      return routes[route];
    }

    if (route.includes(':')) {
      const routeRegex = new RegExp('^' + route.replace(/:\w+/g, '\\w+') + '$');
      if (routeRegex.test(path)) {
        return routes[route];
      }
    }
  }
  return null;
}

// Handler for the home page
function homeHandler(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Welcome to the Home Page!</h1>');
}

// Handler for the about page
function aboutHandler(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>About Us</h1><p>We are a highly professional team.</p>');
}

// Handler for user-specific pages
function userHandler(req, res, query) {
  const username = query.username;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1>Welcome, ${username}!</h1><p>This is your profile page.</p>`);
}

// Handler for an API endpoint that returns data in JSON format
function apiDataHandler(req, res) {
  const data = { message: 'This is a sample API response' };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Middleware function to log all incoming requests
function requestLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

// Apply middleware function to all routes
for (const route in routes) {
  routes[route] = (function (routeHandler) {
    return function (req, res, query) {
      requestLogger(req, res, function () {
        routeHandler(req, res, query);
      });
    };
  })(routes[route]);
}