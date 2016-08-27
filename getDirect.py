import requests
import os
import sys

file_name = sys.argv[1]
print(file_name)
url = "http://i.imgur.com/" + file_name
r1 = requests.get(url)
if r1.status_code == 200:
	f = open('static/direct/_' + file_name, "wb")
	f.write(r1.content)
	f.close()