import { Injectable, Logger } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(private readonly mailerService: NestMailerService) {}

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Welcome to Car Rental!',
        template: 'welcome',
        context: { name },
      });
      this.logger.log(`Welcome email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${to}:`, error);
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }
  }

  async sendVerificationCodeEmail(to: string, code: string, name: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Your Car Rental Password Reset Code',
        template: 'reset-password',
        context: {
          name,
          code,
        },
      });
      this.logger.log(`Password reset email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${to}:`, error);
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }

  async sendBookingCompletedEmail(
    to: string,
    name: string,
    vehicleTitle: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Your Booking is Complete',
        template: 'booking-completed',
        context: {
          name,
          vehicleTitle,
          startDate: startDate.toDateString(),
          endDate: endDate.toDateString(),
        },
      });
      this.logger.log(`Booking completed email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send booking completed email to ${to}:`, error);
      throw new Error(`Failed to send booking completed email: ${error.message}`);
    }
  }

  async testEmailConnection(): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: 'test@example.com',
        subject: 'Test Email',
        text: 'This is a test email to verify the configuration.',
      });
      this.logger.log('Test email sent successfully');
      return true;
    } catch (error) {
      this.logger.error('Email configuration test failed:', error);
      return false;
    }
  }
}