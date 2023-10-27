import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { getDataAttributeFrom } from '../../helpers';
import { useLocalStorage } from '../../hooks';

type MotionContextProps = {
  isReduced: boolean;
  setIsReduced: Dispatch<SetStateAction<boolean>>;
  toggleReducedMotion: () => void;
};

export const MotionContext = createContext<MotionContextProps>({
  isReduced: false,
  setIsReduced: (value) => value,
  toggleReducedMotion: () => null,
});

const validator = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export type MotionProviderProps = {
  /**
   * The attribute name to append to document root.
   */
  attribute: string;
  /**
   * The provider children.
   */
  children?: ReactNode;
  /**
   * Is reduced motion currently active?
   *
   * @default false
   */
  hasReducedMotion?: boolean;
  /**
   * The key to use in local storage.
   */
  storageKey: string;
};

export const MotionProvider: FC<MotionProviderProps> = ({
  attribute,
  children,
  hasReducedMotion = false,
  storageKey,
}) => {
  const [isReduced, setIsReduced] = useLocalStorage(
    storageKey,
    hasReducedMotion,
    validator
  );
  const dataAttribute = getDataAttributeFrom(attribute);

  useEffect(() => {
    if (typeof window !== 'undefined')
      document.documentElement.setAttribute(dataAttribute, `${isReduced}`);

    return () => {
      document.documentElement.removeAttribute(dataAttribute);
    };
  }, [dataAttribute, isReduced]);

  const toggleReducedMotion = useCallback(() => {
    setIsReduced((prevState) => !prevState);
  }, [setIsReduced]);

  const value: MotionContextProps = useMemo(() => {
    return { isReduced, setIsReduced, toggleReducedMotion };
  }, [isReduced, setIsReduced, toggleReducedMotion]);

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
};
