#!/usr/bin/env bash

STACK_NAME=lambda-layer

sam deploy --stack-name $STACK_NAME --capabilities CAPABILITY_IAM --resolve-s3