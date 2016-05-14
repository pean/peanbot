# peanbot

peanbot is a [slackbot](https://api.slack.com/bot-users) that helps me keep track of some things going on at [Slack](https://slack.com/). peanbot also has a api that I mainly use to connect [IFTT](https://ifttt.com/) with Slack.

## Install

- Builds and deploys with [Ansible](https://www.ansible.com/)
- Runs on [Forever](https://github.com/foreverjs/forever)

## Configure peanbot

- Copy `config/default.sample.json` to `config/default.json` and configure the parameters.
    - Use environment specific config overrides by add for example `config/production.json` and include only the parameters specific for production environment (fetched from `NODE_ENV`). 

## Configure Ansible playbook

- Copy `hosts.sample` to hosts and edit. Application will build on localhost and deploy to production host

## Build & deploy

`ansible-playbook -i hosts app.yml`