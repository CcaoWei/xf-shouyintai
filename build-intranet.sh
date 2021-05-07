#!/bin/bash

#echo "打包文件"
#yarn build
echo -e "传输business文件 \n"
scp -r ./dist/* 192.168.10.195:/usr/share/nginx/business/
echo "business部署成功 --> http://192.168.10.195:8056"