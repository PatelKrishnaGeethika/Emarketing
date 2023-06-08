# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Set environment variables for your credentials
# Read more at http://twil.io/secure
account_sid = "ACd1c5f0182d76555d9969caf247d1e851"
auth_token = '76f02ea1a48cf44e013e6c6732c640c7'
verify_sid = "VA60f27d71aada09f337c2e009b9cf104b"
# verified_number = "+916300266072"
verified_number = "+918179385162"

client = Client(account_sid, auth_token)

verification = client.verify.v2.services(
    verify_sid).verifications .create(to=verified_number, channel="sms")
print(verification.status)

otp_code = input("Please enter the OTP:")

verification_check = client.verify.v2.services(verify_sid) \
    .verification_checks \
    .create(to=verified_number, code=otp_code)
print(verification_check.status)
