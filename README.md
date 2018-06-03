# Vue-Login
A Vue js Signup/Login test application using Bcrypt

This is a test repository for working with Bcrypt encryption for logins/password and Email Verification Signup.

If you want to test or work on your own, please fork repo or create your seperate work branch.

Example: `ian/work-branch` or `jameson/testing-email-verification`

If you'd like to suggest change to master please open a PR and add team as reviewers before merging


## Run Locally

To run client

```sh
$ cd client
$ npm install
$ npm run dev
```

[Install MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

To run MongoDB

```sh
$ mongod
```


To run server

```sh
$ cd server
$ npm install
$ npm run dev
```

For PC

```sh
$ npm run dev:pc
```


Once running you can test server by going to `http://localhost:8081/api/v1/users`

You sould see the following

![Image](https://i.imgur.com/Qo6KxyX.png)
____________________________

# Testing SendGrid Localy
1. In server directory, create a new directory called `config`
```sh
$ cd server
$ mkdir config
$ cd config
```
2. Create a `.env` file for sendgrid variables
```sh
$ echo "SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
```
3. Open up `sendgrid.env` and edit it to the following
```sh
SENDGRID_API_KEY='YOUR_SENDGRID_API_KEY_HERE'
NO_REPLY_EMAIL='do_not_reply@example.com'
SUBJECT='Custome subject....'
```
