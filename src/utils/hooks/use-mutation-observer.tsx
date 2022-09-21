import { useEffect } from 'react';

type UseMutationObserverProps = {
  callback: () => void;
  options: MutationObserverInit;
  nodeOrSelector: string | HTMLElement;
};

export const useMutationObserver = ({
  callback,
  options,
  nodeOrSelector,
}: UseMutationObserverProps) => {
  useEffect(() => {
    const targetNode =
      typeof nodeOrSelector === 'string'
        ? document.querySelector(nodeOrSelector)!
        : nodeOrSelector;

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, options);

    return () => {
      observer.disconnect();
    };
  }, [nodeOrSelector, options, callback]);
};
