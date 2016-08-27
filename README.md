# imgurProxy

A proxy server built using Nodejs and Python for bypassing firewall at places where Imgur is banned. 

** Don't run this on your computer ( from which you are trying to access Imgur ). Instead run on a remote server **

Use AWS, Nitrous.io, c9.io, Digital Ocean or any other of your choice. Just make sure it can access imgur.

This is a very basic setup and has its limitations

### Version
0.1

### Setup

Make sure you have Nodejs installed

Make sure you have the following packages:

* express
* cookie-parser
* body-parser

You can also install from the package.json file

Run terminal from downloaded directory

```sh
> npm install
```

Make sure you have Python installed

Make sure you have the following packages:
```sh
> pip install requests
```

### Usage

Create a folder `static

Start server using

```sh
> node server.js
```

#### API

Download a direct image

```
/getDirect/filename.extension
```
eg. 
```
/getDirect/zBL0MZt.jpg
```

View the image

```
/ShowDirect/filename
```

eg. 
```
/showDirect/zBL0MZt
```


Download an album

```
/getAlbum/albumname
```

eg. 
```
/getDirect/AVLiP
```

View the album

```
/showAlbum/albumname
```

eg. 
```
/showDirect/AVLiP
```

### Limitations
* getAlbum can get few images as Imgur only shows few images and gets the link of other images using Ajax.
* Have to download all images. :(

### Way forward
* Use the actual Imgur API
