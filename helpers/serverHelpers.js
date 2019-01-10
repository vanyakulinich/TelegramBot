export const routeRegEx = /\/(app)\/(.\d{1,}_.\d{1,})\/(reminder_manager|personal_info)/;
export const checkRoute = (path) => path.match(routeRegEx);