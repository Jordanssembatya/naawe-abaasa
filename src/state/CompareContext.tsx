import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProductById } from '../data/products';
import { useI18n } from '../i18n/I18nProvider';
import { isStringArray, readJson, writeJson } from '../lib/storage';
import { useToast } from './ToastContext';

export const MAX_COMPARE = 3;
const STORAGE_KEY = 'afyaguide.compare';

interface CompareContextValue {
  ids: string[];
  isSelected: (id: string) => boolean;
  isFull: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  replace: (oldId: string, newId: string) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

function loadIds(): string[] {
  const stored = readJson(STORAGE_KEY, [], isStringArray);
  // Drop ids for products that no longer exist.
  return stored.filter((id) => getProductById(id)).slice(0, MAX_COMPARE);
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(loadIds);
  const { notify } = useToast();
  const { t } = useI18n();
  const nameOf = useCallback((id: string) => getProductById(id)?.name ?? t('common.otherProduct'), [t]);

  useEffect(() => writeJson(STORAGE_KEY, ids), [ids]);

  const add = useCallback(
    (id: string) => {
      if (ids.includes(id)) return;
      if (ids.length >= MAX_COMPARE) {
        notify(t('compare.toast.full', { max: MAX_COMPARE }), 'warning');
        return;
      }
      setIds([...ids, id]);
      notify(t(ids.length === 0 ? 'compare.toast.addedFirst' : 'compare.toast.added', { name: nameOf(id) }));
    },
    [ids, notify, t, nameOf],
  );

  const remove = useCallback(
    (id: string) => {
      if (!ids.includes(id)) return;
      setIds(ids.filter((x) => x !== id));
      notify(t('compare.toast.removed', { name: nameOf(id) }));
    },
    [ids, notify, t, nameOf],
  );

  const replace = useCallback(
    (oldId: string, newId: string) => {
      if (oldId === newId || ids.includes(newId)) return;
      setIds(ids.map((x) => (x === oldId ? newId : x)));
      notify(t('compare.toast.replaced', { old: nameOf(oldId), new: nameOf(newId) }));
    },
    [ids, notify, t, nameOf],
  );

  const clear = useCallback(() => {
    setIds([]);
    notify(t('compare.toast.cleared'));
  }, [notify, t]);

  const value = useMemo(
    () => ({
      ids,
      isSelected: (id: string) => ids.includes(id),
      isFull: ids.length >= MAX_COMPARE,
      add,
      remove,
      replace,
      clear,
    }),
    [ids, add, remove, replace, clear],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider');
  return ctx;
}
