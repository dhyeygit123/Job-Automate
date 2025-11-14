const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "email_logs.csv");

// Initialize log file with headers if not present
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, "timestamp,name,email,company,role,status,message\n");
}

function logEmail(contact, status, message = "") {
  const timestamp = new Date().toISOString();
  const row = `"${timestamp}","${contact.name}","${contact.email}","${contact.company}","${contact.role}","${status}","${message.replace(/"/g, '""')}"\n`;
  fs.appendFileSync(LOG_FILE, row);
}

module.exports = logEmail;
