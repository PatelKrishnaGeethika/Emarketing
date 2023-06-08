from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
# from twilio.verify.services import VerificationServiceSid
# from .models import MobileNumber
from api.models import Customer
from rest_framework.parsers import JSONParser


@csrf_exempt
def generate_otp(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        mobile_number = "+91"+data['mobile_number']
        if Customer.objects.filter(contact=mobile_number).exists():
            return JsonResponse({'message': 'Mobile No already exists'}, status=409)
        else:
            client = Client(settings.TWILIO_ACCOUNT_SID,
                            settings.TWILIO_AUTH_TOKEN)

            try:
                verification = client.verify.v2.services(
                    settings.VERIFIED_SID).verifications .create(to=mobile_number, channel="sms")

                print(verification.status)
                return JsonResponse({'message': 'OTP sent successfully'}, status=200)

            except TwilioRestException as e:
                return JsonResponse({'message': 'Failed to send OTP: ' + str(e)}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'})


@csrf_exempt
def verify_otp(request):
    data = JSONParser().parse(request)
    mobile_number = "+91"+data['mobile_number']
    otp_code = data['otp']
    client = Client(settings.TWILIO_ACCOUNT_SID,
                    settings.TWILIO_AUTH_TOKEN)
    try:
        verification_check = client.verify.v2.services(settings.VERIFIED_SID) \
            .verification_checks \
            .create(to=mobile_number, code=otp_code)

        print(verification_check.status)
        if verification_check.status == 'approved':
            # save the user to data base or may be have another API for it
            return JsonResponse({'message': 'OTP verified successfully'}, status=200)
        else:
            return JsonResponse({'message': 'Invalid OTP'}, status=400)
    except TwilioRestException as e:
        return JsonResponse({'message': 'Failed to verify OTP: ' + str(e)}, status=400)
