#!/bin/bash

#echo "打包文件"
#yarn build
echo -e "传输business文件 \n"
scp -r ./dist/** /usr/share/nginx/html/business/
echo "business部署成功 --> http://business.cafewallet.cn/ "
