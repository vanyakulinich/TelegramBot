// TODO: improve messages
const botCommands = {
  start: `'start' - the description of bot`,
  help: `'help' - the list of bot commands`,
  link: `'link' - web link to personal page`,
  remind: `'remind [text of your reminder] [numeric date in format dd.mm.yyyy] [numeric time in format hh:mm]'`,
}

const listOfCommands = `
  The list of avaliable commands: 
  ${botCommands.start}
  ${botCommands.help}
  ${botCommands.remind}
  ${botCommands.link}
`;

export const messages = {
  // TODO: pesonalize start message
  start: `
    Greetings!
    This is a smart Reminder Bot.
    You can store all reminders like events, todos or birthdays here.
    Reminder Bot will help you not to forget about important events and remember all things.

    With this bot you can manage your reminders.
    ${listOfCommands}

    The bot allows you to set up quickly a new reminder. To get, update, delete or manage in other way your reminders, please use your personal page.

    To get full control and manage all your reminders, you can ask a web link from bot(just send message with text: link):
    You will recieve a web link to your personal protected page where you can manage all your personal info and all your reminders.
    If you ask for link it will be able for 5 min to pass through. If you don't use this link during this time, you will have to ask for a new one.
    This is for your data security. When you get to web page, you can use it as long as you want.
  `,
  help: `
    Bot help.
    ${listOfCommands}

    To manage your reminders please use your personal web page.
    To get access to it, set link command to bot.
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
  invalidTime: `
    Sorry, invalid time input. Please follow the syntax:
    ${botCommands.remind}
  `,
  successReminder: (match) => `Congrats! New reminder "${match[1]}" is set up for ${match[2]} at ${match[3]}`,
  errorMsg: `Sorry, something went wrong...Please try again`
};

export const remindMessage =(dateValidation, timeValidation, match) => {
  if (!timeValidation) return messages.invalidTime;
  if (dateValidation) return (
    (dateValidation.length) ? dateValidation : messages.successReminder(match)
  );
  return messages.invalidRemind;
}

export const manageValidations = (validatedDate, validatedTime) => {
  let defaultResult = {
    valid: false,
    msg: ''
  };
  if (!validatedTime)  {
    defaultResult.msg = messages.invalidTime;
    return defaultResult;
  }
  if (validatedDate && validatedDate.length) defaultResult.msg = validatedDate;
  if (validatedDate && typeof(validatedDate) === 'boolean') defaultResult.valid = true;
  return defaultResult;
}

export const botRegEx = {
  start: /\/start|start|Start/,
  help: /\/help|help|Help/,
  link: /Link|link/,
  remind: /Remind|remind (.{1,}) (\d{2}\.\d{2}\.\d{4}) (\d{2}:\d{2})/,
};

