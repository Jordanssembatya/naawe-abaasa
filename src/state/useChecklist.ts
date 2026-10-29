import { useCallback, useEffect, useState } from 'react';
import { isStringArray, readJson, writeJson } from '../lib/storage';

/** Checklist progress for one product, saved only in this browser. */
export function useChecklist(productId: string, itemIds: string[]) {
  const key = `afyaguide.checklist.${productId}`;
  const [done, setDone] = useState<string[]>(() => readJson(key, [], isStringArray));

  useEffect(() => writeJson(key, done), [key, done]);

  const toggle = useCallback(
    (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id])),
    [],
  );
  const reset = useCallback(() => setDone([]), []);

  // Ignore stale ids if the checklist definition changes.
  const completed = itemIds.filter((id) => done.includes(id));

  return { completed, toggle, reset, total: itemIds.length };
}
