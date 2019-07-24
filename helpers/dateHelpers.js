const getTimezoneDifference = (forecastTimezone, userTimezone) => {
  // return timezone difference in seconds
  // forecastTimezone and userTimezone should be entered in seconds
  // userTimezone is optional
  // example EST -04:00 = -14400 ... CET +02:00 = 7200
  if (userTimezone === undefined) {
    userTimezone = new Date().getTimezoneOffset() * 60;
    if (userTimezone < 0) {
      userTimezone = Math.abs(userTimezone);
    } else if (userTimezone > 0) {
      userTimezone = 0 - userTimezone;
    }
  }

  if (userTimezone === forecastTimezone) {
    // no timezone difference
    return 0;
  } else if (userTimezone > forecastTimezone) {
    // timezone of searched location is behind user's timezone
    // return negative number
    if (
      (userTimezone >= 0 && forecastTimezone >= 0) ||
      (userTimezone <= 0 && forecastTimezone <= 0)
    ) {
      return 0 - (userTimezone - forecastTimezone);
    } else if (userTimezone >= 0 && forecastTimezone <= 0) {
      return 0 - (userTimezone + Math.abs(forecastTimezone));
    }
  } else if (userTimezone < forecastTimezone) {
    // timezone of searched location is ahead user's timezone
    // return positive number
    if (
      (userTimezone >= 0 && forecastTimezone >= 0) ||
      (userTimezone <= 0 && forecastTimezone <= 0)
    ) {
      return userTimezone - forecastTimezone;
    } else if (userTimezone <= 0 && forecastTimezone >= 0) {
      return Math.abs(userTimezone) + forecastTimezone;
    }
  }
};

module.exports = getTimezoneDifference;
