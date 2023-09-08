export function camelToSnake(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(camelToSnake)
  }

  const snakeObj = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      snakeObj[snakeKey] = camelToSnake(obj[key])
    }
  }

  return snakeObj
}
