const fs = require("fs");
const csv = require("csv-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const generateEmail = require("./emailTemplate");

const LOG_FILE = "logs.csv";
const RESUME_PATH = "Resume.pdf"; // put your resume here

// Write headers for logs if file doesn’t exist
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, "name,email,company,role,status,timestamp\n");
}

async function main() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const contacts = [];

  fs.createReadStream("contacts.csv")
    .pipe(csv({ headers: ["name", "email", "company", "role"], skipLines: 1 }))
    .on("data", (row) => contacts.push(row))
    .on("end", async () => {
      console.log(`Loaded ${contacts.length} contacts`);

      for (const contact of contacts) {
        const message = generateEmail(contact);

        const mailOptions = {
          from: `"Dhyey Patel" <${process.env.EMAIL_USER}>`,
          to: contact.email,
          subject: contact.role.toLowerCase().includes("manager")
            ? "Exploring opportunities at " + contact.company
            : "Curious about your work at " + contact.company,
          text: message,
          attachments: [
            {
              filename: "Dhyey_Patel_Resume.pdf",
              path: RESUME_PATH,
              contentType: "application/pdf",
            },
          ],
        };

        let status;
        try {
          await transporter.sendMail(mailOptions);
          console.log(`✅ Sent to ${contact.name} (${contact.email})`);
          status = "SUCCESS";
        } catch (err) {
          console.error(`❌ Failed to send to ${contact.email}:`, err.message);
          status = "FAILED";
        }

        // Append log entry
        const logEntry = `${contact.name},${contact.email},${contact.company},${contact.role},${status},${new Date().toISOString()}\n`;
        fs.appendFileSync(LOG_FILE, logEntry);

        await new Promise((r) => setTimeout(r, 2000)); // throttle
      }

      console.log(`\n📄 Logs saved to ${LOG_FILE}`);
    });
}

main();
