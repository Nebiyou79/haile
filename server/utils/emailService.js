const nodemailer = require('nodemailer');

// Create transporter with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000
});

// Professional Email Template for Client Confirmation
const confirmationTemplate = (appointment) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation - FWL-CPA</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2D3748; background-color: #F7FAFC; }
        .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1D4ED8 100%); padding: 30px 20px; text-align: center; }
        .logo { color: white; font-size: 28px; font-weight: bold; letter-spacing: 1px; }
        .tagline { color: rgba(255, 255, 255, 0.8); font-size: 14px; margin-top: 5px; }
        .content { padding: 30px; }
        .footer { background: #EDF2F7; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
        .appointment-card { background: #F7FAFC; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .appointment-detail { margin-bottom: 10px; display: flex; }
        .detail-label { font-weight: 600; width: 120px; color: #4A5568; }
        .detail-value { flex: 1; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 10px 0; }
        .divider { height: 1px; background: #E2E8F0; margin: 25px 0; }
        .icon-text { display: flex; align-items: center; margin-bottom: 8px; }
        .icon { margin-right: 10px; color: #2563eb; }
        @media (max-width: 600px) {
            .appointment-detail { flex-direction: column; margin-bottom: 15px; }
            .detail-label { width: 100%; margin-bottom: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">FWL-CPA</div>
            <div class="tagline">Professional Accounting & Financial Services</div>
        </div>
        
        <div class="content">
            <h2 style="color: #2D3748; margin-bottom: 20px;">Your Appointment is Confirmed</h2>
            <p>Dear ${appointment.name},</p>
            <p>Thank you for choosing FWL-CPA for your ${appointment.service.toLowerCase()} needs. Your appointment has been successfully scheduled.</p>
            
            <div class="appointment-card">
                <h3 style="color: #2563eb; margin-bottom: 15px;">Appointment Details</h3>
                <div class="appointment-detail">
                    <span class="detail-label">Service:</span>
                    <span class="detail-value">${appointment.service}</span>
                </div>
                <div class="appointment-detail">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${appointment.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="appointment-detail">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}</span>
                </div>
                <div class="appointment-detail">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${appointment.appointmentType === 'in-person' ? 'In-Person Meeting' : 'Virtual Meeting'}</span>
                </div>
                ${appointment.appointmentType === 'virtual' ? `
                <div class="appointment-detail">
                    <span class="detail-label">Meeting Link:</span>
                    <span class="detail-value">Will be sent 1 hour before your appointment</span>
                </div>
                ` : ''}
                <div class="appointment-detail">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${appointment.appointmentType === 'in-person' ? 'Our Office Address' : 'Online Meeting'}</span>
                </div>
            </div>

            <div class="icon-text">
                <span class="icon">📅</span>
                <span>Add this appointment to your calendar</span>
            </div>
            <div class="icon-text">
                <span class="icon">⏰</span>
                <span>We'll send a reminder 24 hours before your appointment</span>
            </div>
            
            <div class="divider"></div>
            
            <h3 style="color: #2D3748; margin-bottom: 15px;">Preparing for Your Appointment</h3>
            <p>To make the most of our time together, please have the following documents ready:</p>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li>Previous tax returns (if applicable)</li>
                <li>Financial statements or records</li>
                <li>Any relevant correspondence from tax authorities</li>
                <li>List of questions or topics you'd like to discuss</li>
            </ul>
            
            <p>If you need to reschedule or have any questions, please contact us at <a href="mailto:haile@fwl-cpa.com" style="color: #2563eb;">haile@fwl-cpa.com</a> or call us at 702-815-9685.</p>
            
            <p style="margin-top: 20px;">We look forward to serving you!</p>
            <p><strong>The FWL-CPA Team</strong></p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} FWL-CPA. All rights reserved.</p>
            <p>2809 Emerywood Pkwy, Ste 330 Henrico, VA 23294</p>
            <p><a href="https://fwl-cpa.com" style="color: #2563eb; text-decoration: none;">www.fwl-cpa.com</a> | <a href="mailto:haile@fwl-cpa.com" style="color: #2563eb; text-decoration: none;">haile@fwl-cpa.com</a></p>
        </div>
    </div>
</body>
</html>
`;

// Professional Email Template for Admin Notification
const adminTemplate = (appointment) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment Booking - FWL-CPA</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2D3748; background-color: #F7FAFC; }
        .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; }
        .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 20px; text-align: center; }
        .alert-icon { font-size: 24px; color: white; margin-bottom: 10px; }
        .alert-title { color: white; font-size: 20px; font-weight: bold; }
        .content { padding: 25px; }
        .footer { background: #EDF2F7; padding: 15px; text-align: center; font-size: 12px; color: #718096; }
        .booking-card { background: #F0FDF4; border: 1px solid #BBF7D0; padding: 20px; margin: 20px 0; border-radius: 6px; }
        .booking-detail { margin-bottom: 12px; display: flex; }
        .detail-label { font-weight: 600; width: 140px; color: #065F46; }
        .detail-value { flex: 1; }
        .button { display: inline-block; background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 10px 0; }
        @media (max-width: 600px) {
            .booking-detail { flex-direction: column; margin-bottom: 15px; }
            .detail-label { width: 100%; margin-bottom: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="alert-icon">📅</div>
            <div class="alert-title">New Appointment Booking</div>
        </div>
        
        <div class="content">
            <p>Hello FWL-CPA Team,</p>
            <p>A new appointment has been booked through the website. Here are the details:</p>
            
            <div class="booking-card">
                <h3 style="color: #065F46; margin-bottom: 15px;">Client & Appointment Details</h3>
                <div class="booking-detail">
                    <span class="detail-label">Client Name:</span>
                    <span class="detail-value">${appointment.name}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value"><a href="mailto:${appointment.email}" style="color: #059669;">${appointment.email}</a></span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${appointment.phone}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Service:</span>
                    <span class="detail-value">${appointment.service}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Appointment Type:</span>
                    <span class="detail-value">${appointment.appointmentType === 'in-person' ? 'In-Person' : 'Virtual'}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${appointment.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}</span>
                </div>
                <div class="booking-detail">
                    <span class="detail-label">Booked At:</span>
                    <span class="detail-value">${appointment.createdAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                ${appointment.notes ? `
                <div class="booking-detail">
                    <span class="detail-label">Client Notes:</span>
                    <span class="detail-value">${appointment.notes}</span>
                </div>
                ` : ''}
            </div>
            
            <p>This appointment has been added to the system. Please ensure all necessary preparations are made.</p>
            
            <a href="https://fwl-cpa.com/admin/appointments" class="button">View in Admin Portal</a>
        </div>
        
        <div class="footer">
            <p>FWL-CPA Booking System | Automated Notification</p>
        </div>
    </div>
</body>
</html>
`;

// Send confirmation email to client
exports.sendConfirmationEmail = async (appointment) => {
  try {
    const mailOptions = {
      from: `FWL-CPA <${process.env.EMAIL_USER}>`,
      to: appointment.email,
      subject: `Your FWL-CPA Appointment Confirmation - ${appointment.date.toLocaleDateString()}`,
      html: confirmationTemplate(appointment),
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'FWL-CPA Booking System'
      }
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw error;
  }
};

// Send notification to admin
exports.sendAdminNotification = async (appointment) => {
  try {
    const mailOptions = {
      from: `FWL-CPA Booking System <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking: ${appointment.name} - ${appointment.service} - ${appointment.date.toLocaleDateString()}`,
      html: adminTemplate(appointment),
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'FWL-CPA Booking System'
      }
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
};