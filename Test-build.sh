#!/bin/bash

echo "打包文件"
zip -r meet.zip ./dist/
echo -e "传输meetingMinutes文件 \n"
scp -P 1107 -r ./dist/* 172.31.195.112:/usr/share/nginx/html/meetingMinutes/
#scp -P 1107 -r ./meet.zip 172.31.195.112:/usr/share/nginx/html/tmp/