// TODO: improve messages
const listOfCommands = `
  The list of commands: 
  'start' - the description of bot
  'help' - the list of bot commands
  'link' - web link to personal page
  'set [reminder] [date] [time]' - sets new reminder (if time is not specified, the time will be 9:00)
  'get [reminder/date] - gets reminder or reminders (if date - all reminders for this date)
  'all' - the list of all reminders
  'update [reminder] [new text for reminder] [new date] [new time]' - change existing reminder 
`;

export const messages = {
  start: `
    This is a smart Reminder Bot.
    You can store all reminders like events, todos or birthdays here.
    Reminder Bot will help you not to forget about important events and remember all things.

    With this bot you can manage your reminders.
    ${listOfCommands}

    You can also access all your reminders by asking a web link from bot:
      You will recieve a web link to your personal protected page where you can manage all your personal info and all your reminders
      If you ask for link it will be able for 5 min to pass through. If you don't use this link during this time, you will have to ask for a new one.
      this is for your data security. When you get to web page, you can use it as long as you want.
  `,
  /* TODO: imporve help message*/
  help: `
    Bot help:
      ${listOfCommands}
  `,
}
