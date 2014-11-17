FROM ubuntu
MAINTAINER mathashallex32@gmail.com
RUN sudo apt-get update && \
#
#INSTALL gcc,make,curl
 sudo apt-get -y install gcc  && \
 sudo apt-get -y install make && \
 sudo apt-get -y install curl && \
#
#SETUP AND INSTALL nodejs
#
 curl -sL https://deb.nodesource.com/setup | sudo bash - && \
 sudo apt-get install -y nodejs && \
#
#INSTALL REDIS
#
 sudo apt-get -y install wget && \ 
 wget http://download.redis.io/releases/redis-2.8.17.tar.gz && \
 tar xzf redis-2.8.17.tar.gz && \
 cd redis-2.8.17 && \
cd deps && \
 make hiredis lua jemalloc linenoise && \
 cd ../ && \
 make 


