import { isToday } from "./dateUtils";

const FILTERS_NAMES = {
  all: "all",
  today: "today",
  expired: "expired",
  active: "active"
};

const activeFilterCheck = function(filters) {
  return function(filterToCheck) {
    return filters.includes(FILTERS_NAMES[filterToCheck]);
  };
};

const applyExtraFilters = (type, condition, object) => {
  const filteredResult = {};
  for (let key in object) {
    if (object[key][type] === condition) {
      filteredResult[key] = { ...object[key] };
    }
  }
  return filteredResult;
};

export const dynamicFilterReminders = (reminders, filters) => {
  const { all, today, expired, active } = FILTERS_NAMES;
  const filtersToApply = Object.keys(filters).filter(el => filters[el]);
  const isActiveFilter = activeFilterCheck(filtersToApply);

  const expiredAndActive = isActiveFilter(expired) && isActiveFilter(active);
  const allExtraFilters = filtersToApply.length === 1 || expiredAndActive;

  if (isActiveFilter(all)) {
    if (allExtraFilters) return reminders;
    if (isActiveFilter(expired) || isActiveFilter(active))
      return applyExtraFilters(expired, filters.expired, reminders);
  }

  if (isActiveFilter(today)) {
    const filteredReminders = {};

    for (let key in reminders) {
      if (isToday(reminders[key].dateMs)) {
        const expiredToShow = isActiveFilter(expired) && reminders[key].expired;
        const activeToShow = isActiveFilter(active) && !reminders[key].expired;
        if (allExtraFilters || expiredToShow || activeToShow) {
          filteredReminders[key] = { ...reminders[key] };
        }
      }
    }
    return filteredReminders;
  }

  return reminders;
};
