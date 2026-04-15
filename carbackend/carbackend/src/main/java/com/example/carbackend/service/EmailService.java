package com.example.carbackend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@SuppressWarnings("all")
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetPasswordEmail(String to, String resetLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("your-email@gmail.com"); // Should ideally match spring.mail.username
        helper.setTo(to);
        helper.setSubject("Reset Your SmartCar Password");

        String htmlContent = "<html>" +
                "<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; padding: 20px;'>" +
                "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>" +
                "<h2 style='color: #0d6efd; margin-bottom: 20px;'>SmartCar Password Reset</h2>" +
                "<p style='color: #555555; line-height: 1.6;'>Hello,</p>" +
                "<p style='color: #555555; line-height: 1.6;'>We received a request to reset the password for your SmartCar account. Click the button below to set a new password:</p>" +
                "<div style='text-align: center; margin: 30px 0;'>" +
                "<a href='" + resetLink + "' style='background-color: #0d6efd; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Reset Password</a>" +
                "</div>" +
                "<p style='color: #555555; line-height: 1.6;'>If you didn't request this, you can safely ignore this email. The link will expire in 24 hours.</p>" +
                "<hr style='border: none; border-top: 1px solid #eeeeee; margin: 20px 0;'>" +
                "<p style='color: #888888; font-size: 12px;'>Best Regards,<br>The SmartCar Team</p>" +
                "</div>" +
                "</body>" +
                "</html>";

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}
