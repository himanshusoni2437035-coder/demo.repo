const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;

const server = http.createServer((req, res) => {

    console.log("Request:", req.url);

    let file;
    let statusCode = 200;

    if (req.url === "/") {
        file = "home.html";
    }

    else if (req.url === "/about") {
        file = "about.html";
    }

    else if (req.url === "/faq") {
        file = "faq.html";
    }

    else if (req.url === "/contact") {
        file = "contact.html";
    }

    // ❌ UNKNOWN URL
    else {
        file = "404.html";
        statusCode = 404;
    }

    const filePath = path.join(__dirname, file);

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            console.log("ERROR:", err);

            res.writeHead(500, {
                "Content-Type": "text/html"
            });

            res.end("<h1>500 - Server Error</h1>");
            return;
        }

        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });

});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});