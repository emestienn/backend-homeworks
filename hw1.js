import fs from "fs";

console.log("App started");

fs.appendFileSync(
  "logs.txt",
  `Log yozildi: ${new Date().toISOString()}\n`
);

setTimeout(() => {
  console.log("First timeout event");
}, 2000);

let interval = setInterval(() => {
  console.log("Interval tick");
}, 1000);

setTimeout(() => {
  clearInterval(interval);
}, 3000);

function readLogs() {
  try {
    let logs = fs.readFileSync("logs.txt", "utf8");
    console.log(logs.trim());
  } catch (error) {
    console.log("Error: can't read logs.file");
  }
}

setTimeout(readLogs, 5000);