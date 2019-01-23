export const routeRegEx = /\/(app)\/(.{1,})\/(reminder_manager|personal_info)/;
export const checkRoute = path => path.match(routeRegEx);
