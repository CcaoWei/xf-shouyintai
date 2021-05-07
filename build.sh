#!/bin/bash

#echo "打包文件"
#yarn build
echo -e "传输meetingMinutes文件 \n"
scp -r ./dist/** /usr/share/nginx/html/meetingMinutes/
echo "business部署成功 --> http://meetingmanagement.cafewallet.cn/ "
