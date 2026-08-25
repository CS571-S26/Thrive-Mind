import { apiRequest } from "./client.js";

export const fetchSelfCareDays = (days = 90) =>
  apiRequest(`/api/self-care-days?days=${days}`).then((data) => data.history);

export const putSelfCareDay = (dateKey, checkedItems) =>
  apiRequest(`/api/self-care-days/${dateKey}`, {
    method: "PUT",
    body: { checkedItems }
  });
