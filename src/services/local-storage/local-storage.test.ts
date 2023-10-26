import { describe, expect, it, jest } from '@jest/globals';
import { LocalStorage } from './local-storage';

describe('LocalStorage', () => {
  it('should return an undefined value when the key is not set', () => {
    localStorage.clear();

    expect(LocalStorage.get('et')).toBeUndefined();
  });

  it('can set a new key and return its value', () => {
    localStorage.clear();

    const key = 'laudantium';
    const value = 'laborum';

    LocalStorage.set(key, value);

    expect(LocalStorage.get(key)).toBe(value);
  });

  it('can update an existing key', () => {
    localStorage.clear();

    const key = 'officiis';
    const value = 'saepe';

    LocalStorage.set(key, value);

    const newValue = 'itaque';

    LocalStorage.set(key, newValue);

    expect(LocalStorage.get(key)).toBe(newValue);
  });

  it('can remove a key from the storage', () => {
    localStorage.clear();

    const key1 = 'ab';
    const value1 = 'ipsum';
    const key2 = 'suscipit';
    const value2 = 'autem';

    LocalStorage.set(key1, value1);
    LocalStorage.set(key2, value2);
    LocalStorage.remove(key1);

    expect(LocalStorage.get(key1)).toBeUndefined();
    expect(LocalStorage.get(key2)).toBe(value2);
  });

  it('can clear the storage', () => {
    localStorage.clear();

    const key1 = 'velit';
    const value1 = 'rerum';
    const key2 = 'enim';
    const value2 = 'consequatur';

    LocalStorage.set(key1, value1);
    LocalStorage.set(key2, value2);
    LocalStorage.clear();

    expect(LocalStorage.get(key1)).toBeUndefined();
    expect(LocalStorage.get(key2)).toBeUndefined();
  });

  it('return undefined and log and error when the value is invalid', () => {
    const spy = jest.spyOn(console, 'error');
    const key = 'dolor';
    const value = 'possimus';

    // The value is not stringified
    localStorage.setItem(key, value);

    expect(LocalStorage.get(key)).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });

  it('does not set invalid value and log the error', () => {
    const spy = jest.spyOn(console, 'error');
    const key = 'voluptatibus';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const value = BigInt(1234567890);

    LocalStorage.set(key, value);

    expect(LocalStorage.get(key)).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });
});
