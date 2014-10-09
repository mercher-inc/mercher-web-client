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

### Install GIT
```bash
sudo apt-get install git
git --version
```
and then go through [this manual](https://help.github.com/articles/set-up-git#setting-up-git) to set up git and [this manual](https://help.github.com/articles/generating-ssh-keys) to generate ssh keys.

### Install Node.js
```bash
cd ~
sudo apt-get update
sudo apt-get install build-essential libssl-dev
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.17.2/install.sh | bash
nvm install 0.10.26
nvm use 0.10
nvm alias default 0.10
node -v
```

### Install Bower
```bash
npm install -g bower
```

### Install Grunt
```bash
npm install -g grunt-cli
```

### Install PhantomJS
```bash
npm install -g phantomjs
```

### Install Ruby
```bash
sudo apt-get install curl
\curl -sSL https://get.rvm.io | bash -s stable
rvm install 2.1
/bin/bash --login
rvm use 2.1
gem install haml
```

### Configure server
Install Apache
```bash
sudo apt-get install apache2
sudo a2enmod proxy
sudo a2enmod proxy_http
```
Create config file
```bash
sudo nano /etc/apache2/sites-available/local.mercherdev.com.conf
```
Paste config
```
<VirtualHost *:80>
  ServerName local.mercherdev.com
  ProxyRequests Off
  <Proxy *>
    Order deny,allow
    Allow from all
  </Proxy>
  ProxyPreserveHost on
  ProxyPass /swagger   http://staging.mercherdev.com/swagger
  ProxyPass /api       http://staging.mercherdev.com/api
  ProxyPass /socket.io http://staging.mercherdev.com/socket.io
  ProxyPass /          http://localhost:9000/
</VirtualHost>
```
Enable site
```bash
sudo a2ensite local.mercherdev.com
sudo service apache2 reload
```
Add `127.0.0.1 local.mercherdev.com` to local hosts
```bash
sudo nano /etc/hosts
```

### Clone repository
Create working folders and clone project repository:
```bash
mkdir ~/work
mkdir ~/work/mercher-inc
cd ~/work/mercher-inc
git clone git@github.com:mercher-inc/mercher-web-client.git
```

### Install dependencies
```bash
cd ~/work/mercher-inc/mercher-web-client
nvm install
nvm use
npm install
bower install
```

### Install WebStorm
Download WebStorm and unpack it:
```bash
cd ~
wget http://download.jetbrains.com/webstorm/WebStorm-8.0.4.tar.gz
tar xfz WebStorm-8.0.4.tar.gz
rm WebStorm-8.0.4.tar.gz
```

### Open project in WebStorm
```bash
cd ~/work/mercher-inc/mercher-web-client
/bin/bash --login
rvm use 2.1
nvm use
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

### Build Web Client
To build the project run the following command:
```bash
cd ~/work/mercher-inc/mercher-web-client
grunt build
```
It would create `dist` directory with built project.

Have fun!
