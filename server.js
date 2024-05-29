const { createServer } = require('http');
const { parse } = require('url');
const { readFileSync } = require('fs');

const html = readFileSync('./index.html');

const server = createServer((req, res) => {
  const { pathname } = parse(req.url);

  // Serve HTML file for the root path
  if (pathname === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  } else {
    // Handle other routes or files (if needed)
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
