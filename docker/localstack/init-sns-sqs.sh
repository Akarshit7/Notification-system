#!/bin/bash
# Initialize LocalStack with SNS topics and SQS queues
# This script runs when LocalStack starts

echo "Initializing LocalStack SNS/SQS..."

# Create SNS topics
awslocal sns create-topic --name notification-events
awslocal sns create-topic --name email-events
awslocal sns create-topic --name push-events
awslocal sns create-topic --name sms-events

# Create SQS queues
awslocal sqs create-queue --queue-name notification-queue
awslocal sqs create-queue --queue-name email-queue
awslocal sqs create-queue --queue-name push-queue
awslocal sqs create-queue --queue-name sms-queue
awslocal sqs create-queue --queue-name dead-letter-queue

echo "LocalStack initialization complete!"
