###
 # @Author: shaolong
 # @Date: 2022-12-16 15:01:45
 # @LastEditors: shaolong
 # @LastEditTime: 2022-12-16 15:01:46
 # @Description: 
### 

#!/usr/bin/env sh
 
# 当发生错误时中止脚本
set -e
 
# 构建
yarn build
 
# cd 到构建输出的目录下 
cd dist
 
git init
git add -A
git commit -m 'deploy'
 
# 部署到 https://<USERNAME>.github.io/<REPO>

git push -f git@github.com:shaolong1314/react-template.git master:gh-pages
 
cd -