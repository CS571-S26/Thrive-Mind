// A resource that hasn't been re-checked in a while is a real risk for a
// wellness app: a link can rot, a phone number can change, a service can
// shut down. This flags anything whose lastVerified date is stale, rather
// than silently trusting a date that was only ever true once.
export const STALE_AFTER_DAYS = 90;

export const daysSince = (dateString) => {
  const then = new Date(dateString);
  const now = new Date();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
};

export const isStale = (dateString, thresholdDays = STALE_AFTER_DAYS) => {
  if (!dateString) return true;
  return daysSince(dateString) > thresholdDays;
};

export const formatVerifiedDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short"
  });
