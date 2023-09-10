export function camelToSnake(object) {
  if (typeof object !== 'object') {
    return object
  }

  if (Array.isArray(object)) {
    return object.map(camelToSnake)
  }

  const result = {}

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      result[snakeKey] = camelToSnake(object[key])
    }
  }

  return result
}
