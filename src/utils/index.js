const IP_REGEX =
  /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IP_DOMAIN = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const startsWithNumber = /^\d/;

export { IP_REGEX, IP_DOMAIN, startsWithNumber };
