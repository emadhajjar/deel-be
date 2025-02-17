# Deel

This is the repository for the `Dell Back-end Engineer Code Test`.

## Table of contents

- [Deel](#deel)
  - [Table of contents](#table-of-contents)
  - [Documentation](#documentation)
  - [Getting Stated](#getting-stated)
    - [Installation](#installation)
    - [Start up the Dev Server](#start-up-the-dev-server)
  - [Tools](#tools)
    - [Git hooks](#git-hooks)
    - [Homebrew](#homebrew)
    - [Volta.js](#voltajs)
  - [Merge Requests](#merge-requests)
  - [Tips](#tips)
    - [Create a branch from the latest `dev`](#create-a-branch-from-the-latest-main)
      - [Rebasing your brach onto latest `dev`](#rebasing-your-brach-onto-latest-main)
  - [Environments](#environments)
  - [Helpful Resources](#helpful-resources)

## Documentation

This README file includes basic information to help you get started on the project.

There are lots of things that still need to be documented. If you have any
suggestions, feel free to submit a Merge Request or discuss with the team!
Improvements are always welcome.

## Getting Stated

### Installation

1. It's recommended to have [Homebrew](#homebrew) and [Volta](#voltajs) installed.
2. Run `yarn` to download and link all dependencies.
3. Run `yarn api seed` to setup the datebase.

### Start up the Dev Server

1. Run `yarn start` to build all packages and start the development server.
2. Go to `http://localhost:3001`

## Tools

### Git hooks

We have a few hooks setup with Husky:

- `pre-commit`: Runs Prettier and ESLint using `lint-staged` before finishing a
  commit. If Eslint throws and error, the commit is aborted.

### Homebrew

Homebrew installs the stuff you need that Apple (or your Linux system) didn’t.

To install Homebrew run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Volta.js

Volta.js makes it easier to manage Node tooling versions. If you have Volta.js
installed you'll automatically use the correct Node and Yarn versions for this
Project in your terminal, just by being in the project folder.

This is defined by the `volta` field in the root `package.json`

To install Volta, run `curl https://get.volta.sh | bash` or you can check out the
official [getting started documentation](https://docs.volta.sh/guide/getting-started)

## Merge Requests

Merge Requests are a great way to share knowledge about the codebase between the
team and to increase the code quality. But in order to be helpful. they need to
follow a few principles:

Some principles are:

1. Write your Merge Requests (MR) as if they are going to ready by other people.
2. Always write a descriptive and meaningful MR description.
3. Keep your MR as short and scoped as possible.

## Tips

### Create a branch from the latest `dev`

Just run `git checkout -b new-branch-name origin/dev`. if you use Zsh with the
git plugin installed, you can replace `git checkout -b` with `gcb`.

Example: `git checkout -b feat/some-feature origin/dev`.

#### Rebasing your brach onto latest `dev`

You can run `git pull --rebase origin/dev`. That way the latest `dev` will be
fetched.

Another options is to update the `dev` branch to it's latest version and then
run `git rebase dev`

## Environments

| Environment | URL          |
| ----------- | ------------ |
| `staging`   | `http://...` |

## Helpful Resources

- [Express](https://expressjs.com/)

# DEEL BACKEND TASK

💫 Welcome! 🎉

This backend exercise involves building a Node.js/Express.js app that will serve a REST API.

There is not a strict time limit to complete this task, but we expect that you will need to spend between 3-5 hours to meet the requirements. Make sure to submit your test only when you are confident that it meets all the requirements and you are satisfied with the quality of the project.

## Data Models

> **All models are defined in `src/model.js`**

### Profile

A profile can be either a `client` or a `contractor`.  
Clients create contracts with contractors, while contractors perform jobs for clients and get paid.  
Each profile has a balance property.

### Contract

A contract exists between a client and a contractor.  
Contracts have 3 statuses: `new`, `in_progress`, and `terminated`.  
Contracts are considered active only when in the `in_progress` status.  
Contracts group jobs within them.

### Job

Contractors get paid for jobs performed under a certain contract by clients.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by creating a local repository for this folder.
2. In the repo's root directory, run `yarn` to install all dependencies.
3. Next, run `yarn api seed` to seed the local SQLite database. **Warning: This will drop the database if it exists**. The database will be stored in a local file named `database.sqlite3`.
4. Then run `yarn api start` to start both the server and the React client.

❗️ **Make sure to commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/), which will automatically restart whenever you modify and save a file.
- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is used on top of it. You should interact with Sequelize. **Please spend some time reading the Sequelize documentation before starting the exercise.**
- To authenticate users, use the `getProfile` middleware located under `src/middleware/getProfile.js`. Users are authenticated by passing `profile_id` in the request header. Once authenticated, the user's profile will be available under `req.profile`. Ensure that only users associated with a contract can access their respective contracts.
- The server is running on port 3001.

## APIs to Implement

Below is a list of the required APIs for the application.

1. **_GET_** `/contracts/:id` - This API is broken 😵! It should return the contract only if it belongs to the profile making the request. Better fix that!

2. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor). The list should only contain non-terminated contracts.

3. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), but only for **_active contracts_**.

4. **_POST_** `/jobs/:job_id/pay` - Pay for a job. A client can only pay if their balance is greater than or equal to the amount due. The payment amount should be moved from the client's balance to the contractor's balance.

5. **_POST_** `/balances/deposit/:userId` - Deposit money into a client's balance. A client cannot deposit more than 25% of the total of jobs to pay at the time of deposit.

6. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contractor who worked within the specified time range.

7. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - Returns the clients who paid the most for jobs within the specified time period. The `limit` query parameter should be applied, and the default limit is 2.

```json
[
  {
    "fullName": "Reece Moyer",
    "id": 1,
    "paid": 100.3
  },
  {
    "fullName": "Debora Martin",
    "id": 200,
    "paid": 99
  },
  {
    "fullName": "Debora Martin",
    "id": 22,
    "paid": 21
  }
]
```

## Going Above and Beyond the Requirements

Given the time expectations for this exercise, we don't expect anyone to submit anything super fancy. However, if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

For example, writing some unit tests or a simple frontend demonstrating calls to your new APIs would be great.

## Submitting the Assignment

When you've finished the assignment, zip your repo (make sure to include the .git folder) and send us the zip file.

Thank you and good luck! 🙏
