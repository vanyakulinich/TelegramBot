export const routeRegEx = /\/(app)\/(.{1,})\/(reminder_manager|personal_info)/;
export const checkRoute = path => {
  const validPath = path.match(routeRegEx);
  return validPath && validPath[2];
};
