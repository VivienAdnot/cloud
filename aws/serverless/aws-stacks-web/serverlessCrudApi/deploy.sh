#!/usr/bin/env bash

STACK_NAME=serverlessCrudApi
SAM_TEMPLATE=sam-template.yaml

npm install
sam deploy --template-file $SAM_TEMPLATE --stack-name $STACK_NAME --resolve-s3 --capabilities CAPABILITY_IAM 