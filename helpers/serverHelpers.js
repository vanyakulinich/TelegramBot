export const routeRegEx = /\/(app)\/(.{1,})\/(reminder_manager|personal_info)/;
export const parseToken = path => {
  const validPath = path.match(routeRegEx);
  return validPath && validPath[2];
};
