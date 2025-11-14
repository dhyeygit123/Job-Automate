function engineerTemplate(contact) {
    return `
  Hi ${contact.name},
  
  I recently graduated in Computer Science and I’m exploring opportunities to learn and grow as a software engineer. While researching on LinkedIn, I came across your profile and found your journey inspiring.
  
  I’d love to connect and hear about your experience working at ${contact.company}. As someone just starting out, I’m keen to learn from engineers who are already doing impactful work.
  
  Best,  
  Dhyey Patel
  `;
  }
  
  function hiringManagerTemplate(contact) {
    return `
  Hi ${contact.name},
  
  I’m a recent Computer Science graduate with strong skills in Node.js, React, and MySQL, and a keen interest in ${contact.company}'s work.
  
  I would love to explore how I might contribute to your team. Could you kindly let me know if there are any upcoming roles or steps I can take to be considered?
  
  Thank you for your time and guidance.
  
  Best regards,  
  Dhyey Patel
  `;
  }
  
  function generateEmail(contact) {
    if (contact.role && contact.role.toLowerCase().includes("manager")) {
      return hiringManagerTemplate(contact);
    }
    return engineerTemplate(contact);
  }
  
  module.exports = generateEmail;
  