/**
 * Tiny helpers so you don't accidentally mutate.
 * Use these if you want, optional.
 */

export function updateKey<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

export function omitKey<T extends Record<string, any>>(
  obj: T,
  keyToOmit: string
): T {
  const { [keyToOmit]: _, ...rest } = obj;
  return rest as T;
}
