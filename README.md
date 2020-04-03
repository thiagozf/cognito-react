# Cognito minimal example

1. Deploy the CloudFormation stack, here `YOUR_STACK` is the stack's name.

```
aws cloudformation deploy --template-file cf.yml --stack-name YOUR_STACK --capabilities CAPABILITY_IAM
```

2. Go to the AWS Console and setup a domain for the hosted UI.

3. Configure the app variables on `.env` with the CloudFormation's output.

```
aws cloudformation describe-stacks --stack-name YOUR_STACK
```

4. Create a test user

```
aws cognito-idp sign-up \
  --region YOUR_COGNITO_REGION \
  --client-id YOUR_COGNITO_APP_CLIENT_ID \
  --username admin@example.com \
  --password Passw0rd!
```

5. Validate test user

```
aws cognito-idp admin-confirm-sign-up \
  --region YOUR_COGNITO_REGION \
  --user-pool-id YOUR_COGNITO_USER_POOL_ID \
  --username admin@example.com
```

5. Install dependencies

```
yarn
```

6. Run the app.

```
yarn start
```

7. Sign in with Cognito!
