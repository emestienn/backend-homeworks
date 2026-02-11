import http from "http";

let students = [
  { id: 1, name: "Ali", age: 15 },
  { id: 2, name: "laylo", age: 14 }
];

let totalRequests = 0;
let lastRequestTime = null;

const server = http.createServer((req, res) => {
  totalRequests++;
  lastRequestTime = new Date().toISOString();

  console.log("Request received");
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  if (req.method === "GET" && req.url === "/students") {
    console.log("GET /students started");

    setTimeout(() => {
      console.log("GET /students finished (timeout)");
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(students));
    }, 500);
    return;
  }

  if (req.method === "POST" && req.url === "/students") {
    console.log("POST /students started");

    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      console.log("POST body received");

      try {
        const data = JSON.parse(body);
        const newStudent = {
          id: students.length + 1,
          name: data.name,
          age: data.age
        };

        students.push(newStudent);
        console.log("New student added");

        res.writeHead(201, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify(students));
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method === "GET" && req.url === "/stats") {
    console.log("GET /stats started");

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        totalRequests: totalRequests,
        studentsCount: students.length,
        lastRequestTime: lastRequestTime
      })
    );
    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(3000, () => { console.log("Server started on http://localhost:3000") });