export const getParsedItemsFromLocalStorage = key =>
  JSON.parse(localStorage.getItem(key)) || [];
