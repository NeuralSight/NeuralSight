// gets storageItem from localStorage if their is any item
export const getStorageItem = (item: string) => {
  let storageItem
  storageItem = localStorage.getItem(item)
  if (storageItem) {
    storageItem = JSON.parse(storageItem)
  } else {
    storageItem = []
  }
  return storageItem
}

// setting the localstorage with data
export const setStorageItem = (name: string, item: any) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export function setStorageItemWithExpiry(name: string, item: any, ttl: number) {
  const now = new Date()

  // `item` is an object which contains the original item
  // as well as the time when it's supposed to expire
  const value = {
    item: item,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(name, JSON.stringify(value))
}

export function getStorageItemWithExpiry(name: string) {
  const itemStr = localStorage.getItem(name)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(name)
    return item
  }
  return item.item
}

// remove item from localstorage
export function removeItemFromStorage(name: string) {
  localStorage.removeItem(name)
  return null
}
