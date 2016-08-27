import requests
from bs4 import BeautifulSoup
import os
import sys

album_name = sys.argv[1]
url = "https://imgur.com/a/" + album_name
folder_name = album_name
r1 = requests.get(url)
if r1.status_code == 200:
	soup = BeautifulSoup(r1.text,"html.parser")
	img_links = soup.findAll("img")
	j = 0
	os.mkdir('static/' + folder_name)
	for i in img_links:
		src = i.get("src");
		if(src[0]!="h"):
			src = "http:" + src;
		q = src.split(".")[-1]
		file_name = src.split("/")[-1]
		if(q=="jpg" or q=="png" or q=="gif" or q=="webm" or q=="webp" or q=="gifv"):
			r2 = requests.get(src)
			if r2.status_code == 200:
				f = open('static/'+folder_name + '/_' + str(j) +"_" + file_name, "wb")
				f.write(r2.content)
				f.close()
				j = j+1