const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const server = http.createServer((req, res) => {
    const { method } = req;

    if (method === "GET") {
        if (req.url === "/") {
            // Serve the index.html page
            fs.readFile("index.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else if (req.url === "/viewusers") {
            // Serve the allstudents page
            fs.readFile("viewusers.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else if (req.url === "/register") {
            // Serve the register page
            fs.readFile("register.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else if (req.url === "/users") {
            // Serve the user data as JSON
            fs.readFile("user.json", "utf8", (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404);
            res.end("Not Found");
        }
    } else if (method === "POST" && req.url === "/register") {
        // Handle POST requests to register a new user
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            let readdata = fs.readFileSync("user.json", "utf-8"); // data stored in string type

            if (!readdata) {
                // If file is empty, add an empty array
                fs.writeFileSync("user.json", JSON.stringify([]));
            } else {
                // If file already has some data
                let jsonData = JSON.parse(readdata);
                let users = [...jsonData];

                let convertedbody = qs.decode(body);
                users.push(convertedbody);
                fs.writeFile("user.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("User data inserted successfully");
                    }
                });
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("Registration successful!");
        });
    } else {
        res.writeHead(404);
        res.end("Not Found in POST request");
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
