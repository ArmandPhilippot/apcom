import {
  createContext,
  type FC,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react';

export type CardCoverProviderProps = {
  children: ReactNode;
  cover?: ReactElement;
};

export const CardCoverContext = createContext<ReactElement | null>(null);

export const useCardCover = () => useContext(CardCoverContext);

export const CardCoverProvider: FC<CardCoverProviderProps> = ({
  children,
  cover,
}) => (
  <CardCoverContext.Provider value={cover ?? null}>
    {children}
  </CardCoverContext.Provider>
);

export type CardFooterMetaProviderProps = {
  children: ReactNode;
  meta?: ReactElement;
};

export const CardFooterMetaContext = createContext<ReactElement | null>(null);

export const useCardFooterMeta = () => useContext(CardFooterMetaContext);

export const CardFooterMetaProvider: FC<CardFooterMetaProviderProps> = ({
  children,
  meta,
}) => (
  <CardFooterMetaContext.Provider value={meta ?? null}>
    {children}
  </CardFooterMetaContext.Provider>
);
