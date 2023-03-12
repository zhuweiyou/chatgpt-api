import sys
from OpenAIAuth import Authenticator

email_address = sys.argv[1]
password = sys.argv[2]

auth = Authenticator(email_address, password)
auth.begin()
print(auth.get_access_token())
