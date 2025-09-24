require('dotenv').config();
const { sendConfirmationEmail, sendAdminNotification } = require('../utils/emailService');

// Test appointment data
const testAppointment = {
  name: 'Test Client',
  email: 'nebawale1111@gmail.com', // Change to your email for testing
  phone: '123-456-7890',
  service: 'Tax Consultation',
  appointmentType: 'virtual',
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  timeSlot: {
    startTime: '10:00:00',
    endTime: '11:00:00'
  },
  notes: 'This is a test appointment',
  createdAt: new Date()
};

async function testEmailService() {
  console.log('Testing email service with Hostinger SMTP...');
  console.log('Using email:', process.env.EMAIL_USER);
  
  try {
    console.log('Sending confirmation email...');
    const confirmationResult = await sendConfirmationEmail(testAppointment);
    console.log('✓ Confirmation email sent successfully');
    
    console.log('Sending admin notification...');
    const adminResult = await sendAdminNotification(testAppointment);
    console.log('✓ Admin notification sent successfully');
    
    console.log('All emails sent successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error sending emails:', error.message);
    
    // Provide specific troubleshooting tips based on error
    if (error.code === 'EAUTH') {
      console.log('\nAuthentication failed. Please check:');
      console.log('1. Your email credentials in the .env file');
      console.log('2. That you\'re using the correct password for haile@fwl-cpa.com');
      console.log('3. That SMTP access is enabled in your Hostinger email settings');
    } else if (error.code === 'ECONNECTION') {
      console.log('\nConnection failed. Please check:');
      console.log('1. Your internet connection');
      console.log('2. That port 465 is not blocked by your firewall');
      console.log('3. That smtp.hostinger.com is accessible from your server');
    } else {
      console.log('\nUnexpected error. Please check your configuration.');
    }
    
    process.exit(1);
  }
}

testEmailService();