# rand-ip

Different methods for generating random IP addresses

## Install depedencies

```sh
git clone git@github.com:IamGideonIdoko/rand-ip.git
cd rand-ip
npm install
```

## Get IP

```sh
node get-ip-from-httpbin
```
[See code](./get-ip-from-httpbin.js)

## Using Rotating Proxy

```sh
node using-rotating-proxy-with-puppeteer
```

[See code](./using-rotating-proxy-with-puppeteer.js)

## Using Tor

Tor Docs: https://2019.www.torproject.org/docs/tor-manual.html.en

Install tor on OSX (using homebrew):
```sh
brew install tor
```

Install tor on Debian/Ubuntu
```sh
apt install tor
```

Installing Tor on Windows using [Tor expert bundle (not the browser)](https://www.torproject.org/download/tor/)

Start Tor Session:

```sh
tor -f ./torrc
```

Create hashed password for Tor authentication
```sh
tor --hash-password rand-ip
```

Update `HashedControlPassword` in `torrc` file
```
HashedControlPassword 16:713D83A3FDF5D578607D40D1F74BCF530734BAB0CAF630326A27864D35
```
### Using Tor with Puppeter

```sh
node using-tor-with-puppeteer
```
[See code](./using-tor-with-puppeteer.js)

### Using Tor with Request

```sh
node using-tor-with-request
```
[See code](./using-tor-with-request.js)