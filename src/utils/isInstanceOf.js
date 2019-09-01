export default function isInstanceOf(object, constructor) {
  while (object != null) {
    if (object == constructor.prototype)
      return true;
    object = Object.getPrototypeOf(object);
  }
  return false;
}
