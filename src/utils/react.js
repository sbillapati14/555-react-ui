import { curry, lensPath, path, set } from 'ramda';

export const getEventValue = path(['target', 'value']);

export const setStateOnChange = curry((element, path, event) => {
  const lens = lensPath(path);
  const value = getEventValue(event);
  const update = set(lens, value, {});

  element.setState(update);
});