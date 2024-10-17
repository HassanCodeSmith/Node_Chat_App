export const emailVarificationTemplate = (otp) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Chat App</title>
  </head>
  <body style="font-family: Arial, sans-serif; padding: 20px">
    <h1>Welcome to Chat App</h1>
    <p>
      Thank you for signing up with Chat App. To complete your registration,
      please use the following One-Time Password (OTP) for email verification:
    </p>
    <p style="font-size: 24px; font-weight: bold; color: #007bff">${otp}</p>
    <p>
      Please enter this OTP in the verification section of the Chat App to
      activate your account.
    </p>
    <p>
      If you did not sign up for an Chat App account, you can safely ignore this
      email.
    </p>
    <p>Thank you,<br />Chat App Team</p>
  </body>
</html>`;
};
