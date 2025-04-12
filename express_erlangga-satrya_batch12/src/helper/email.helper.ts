export const generateOTPEmailHTML = (otp: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Password Reset OTP</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="background-color: #ffffff; max-width: 600px; margin: 30px auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h1 style="color: #333333; text-align: center;">Password Reset</h1>
        <p style="font-size: 16px; color: #555555; line-height: 1.5;">
          You have requested to reset your password.  Please use the following One-Time Password (OTP) to proceed:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #007bff; padding: 10px 20px; border: 1px solid #007bff; border-radius: 5px; background-color: #f0f8ff;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 16px; color: #555555; line-height: 1.5;">
          This OTP is valid for 10 minutes.  If you did not request a password reset, please ignore this email.
        </p>
        <p style="font-size: 14px; color: #777777; margin-top: 30px;">
          Regards,<br>
          The Techno Team  <!-- Replace with your app name -->
        </p>
      </div>
    </body>
    </html>
  `;
};
