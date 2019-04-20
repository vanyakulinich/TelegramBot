### Reminder-Telegram-Bot

#### Project created using Node.js, Koa.js as server, Nuxt.js for web part of the app and Firebase realtime-database

#### Description:

##### Telegram Bot, which stores all reminders, sent to him and fires them on set time, can serve multiple users.

##### Bot has basic commands to serve user. The bot facilites allow communicate with users(get/send reminders).

##### The advanced work with reminders(crud facilities) are implemented in web part(user can take link from bot to his personal page)

##### The project can be scaled by adding additional functions to bot and web(for example calendar for date selection can be implemented into bot and so on)

---

#### Starting project:

```bash
# install dependencies
$ yarn install

# starts web part in dev mode serve with hot reload at localhost:3000
$ yarn dev

#start whole project with bot in dev mode
$ yarn dev:bot

# build for production and launch server
$ yarn prod

```

##### More bash commands can be found in package.json

##### All private keys(for bot, db and so on) are hidden in gitignore. You can put yours instead(put them into config folder in app root folder), also localhost should be replaced by real url for web app work
