const botCommands = {
  start: `'start' - the description of bot`,
  help: `'help' - the list of bot commands`,
  link: `'link' - web link to personal page`,
  list: `'list' - the list of all reminders, set up before`,
  today: `'today' - the list of all today's reminders`,
  remind: `'remind [text of your reminder] [dd.mm.yyyy] [hh:mm]'`
};

const listOfCommands = `
  The list of avaliable commands: 
  ${botCommands.start}
  ${botCommands.help}
  ${botCommands.remind}
  ${botCommands.list}
  ${botCommands.today}
  ${botCommands.link}
`;

export const messages = {
  start: name => `
    Greetings, ${name}!
    This is your SmartReminderBot.
    You can store some necessary daily reminders here.
    ${listOfCommands}
    The bot allows you to set up quickly a new reminder. To get, update, delete or manage in other way your reminders, please use your personal page. Just send "link" to bot.
    You will recieve a web link to your personal protected page where you can manage all your personal info and all your reminders.
    If you ask for link it will be able for 1 min to pass through. If you don't use this link during this time, the page won't be avaliable anymore and you will have to ask for a new one.
    This is for your data security. When you get to web page, you can use it as long as you want.
  `,
  help: `
    Bot help.
    ${listOfCommands}
    To manage your reminders please use your personal web page.
    To get access to it, send link command to bot.
  `,
  link: `Here is the link to your personal protected page for managing your reminders `,
  lists: (reminders, isToday) =>
    reminders === "empty"
      ? `You have no reminders ${isToday ? "for today" : ""} yet`
      : `
    Here is the list of your ${
      isToday ? "today's" : ""
    } reminders:\n${reminders}
    `,
  invalid: `
    Sorry, invalid input. Please use one of the list below:
    ${listOfCommands}
  `,
  invalidRemind: `
    Sorry, invalid input. Please use the following syntax to set up a new reminder:
    ${botCommands.remind}
  `,
  pastYear: `You cannot choose year, that have already passed. Try again`,
  noleapYear: `You cannot choose the 29th of February in no leap year. Try again`,
  invalidDatetime: `
    Sorry, invalid datetime input. Please follow the syntax:
    ${botCommands.remind}
  `,
  successReminder: match =>
    `Congrats! New reminder "${match[1]}" is set up for ${match[2]} at ${
      match[3]
    }`,
  activatedReminder: ({ text, date, time }) => `
    Hi there!
  This is your personal reminder bot.
  You asked me to remind you about ${text.toUpperCase()} on ${date} at ${time}.
  Please DO NOT FORGET about it.
  Have a nice day!
  `,
  reminderExist: `Sorry, you already have a reminder at this time. Please select another time`,
  errorMsg: `Sorry, something went wrong...Please try again`
};

export const remindMessage = (dateValidation, timeValidation, match) => {
  if (!timeValidation) return messages.invalidTime;
  if (dateValidation)
    return dateValidation.length
      ? dateValidation
      : messages.successReminder(match);
  return messages.invalidRemind;
};

export const botRegEx = {
  start: /\/start|[Ss]tart/,
  help: /\/help|[Hh]elp/,
  link: /[Ll]ink/,
  lists: /([Tt]oday)|([Ll]ist)/,
  remind: /[Rr]emind (.{1,}) (\d{2}\.\d{2}\.\d{4}) (\d{2}:\d{2})/,
  other: /(.+)/
};
