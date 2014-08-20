Mercher Web Client
==================

## Dev environment requirements
* [Ubuntu 14.04.1 LTS (Trusty Tahr)](http://releases.ubuntu.com/14.04.1/)
* [JetBrains WebStorm 8.*](http://www.jetbrains.com/webstorm/download/)
* [Node.js 0.10.30](http://nodejs.org/download/)

## Dev environment setup
At first you should download and setup Ubuntu. Hope you can do it by yourself.

### Install JAVA
Install JAVA
```bash
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer
```
Set the "JAVA_HOME" environment variable
```bash
sudo nano /etc/environment
```
add the following line:
```
JAVA_HOME="/usr/lib/jvm/java-7-oracle"
```
reload environment file and check variable
```bash
source /etc/environment
echo $JAVA_HOME
```

### Install WebStorm
Download WebStorm to the home directory, unpack the WebStorm-8.*.tar.gz file using the following command:
```bash
tar xfz WebStorm-8.*.tar.gz
rm WebStorm-8.0.4.tar.gz
```

### Install GIT
```bash
sudo apt-get install git
git --version
```
and then go through [this manual](https://help.github.com/articles/set-up-git#setting-up-git) to set up git.

### Clone repository
Create working folders and clone project repository:
```bash
cd ~
mkdir work
cd work
mkdir mercher-inc
cd mercher-inc
git clone git@github.com:mercher-inc/mercher-web-client.git
```

### Install Node.js
```bash
cd ~
sudo apt-get update
sudo apt-get install build-essential libssl-dev curl
curl https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh
source ~/.profile
nvm ls-remote
nvm install 0.10.30
nvm use 0.10.30
node -v
```

### Install Bower
```bash
npm install -g bower
```

### Install dependencies
```bash
cd ~/work/mercher-inc/mercher-web-client
npm install
bower install
```

### Open project in WebStorm
```bash
~/WebStorm-135.1063/bin/webstorm.sh
```
Then:
* click `Create New Project from Existing Files`;
* select `Source files are in a local directory, no Web server is yet configured`;
* set path to `~/work/mercher-inc/mercher-web-client`;
* click `Project Root` button;
* click `Finish`.

### Run Web Client on local server
```bash
cd ~/work/mercher-inc/mercher-web-client
grunt serve
```

## Build Web Client
To build the project run the following command:
```bash
cd ~/work/mercher-inc/mercher-web-client
grunt build
```
It would create `dist` directory with built project.

Have fun!
