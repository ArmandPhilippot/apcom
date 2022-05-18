import { usePrismTheme } from '@utils/providers/prism-theme';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useState } from 'react';
import useIsMounted from './use-is-mounted';

const useCodeBlocksTheme = (el: RefObject<HTMLDivElement>) => {
  const [preElements, setPreElements] = useState<NodeListOf<HTMLPreElement>>();
  const isMounted = useIsMounted(el);
  const { setCodeBlocks } = usePrismTheme();
  const { asPath } = useRouter();

  useEffect(() => {
    const result = document.querySelectorAll<HTMLPreElement>('pre');
    setPreElements(result);
  }, [asPath]);

  useEffect(() => {
    isMounted && preElements && setCodeBlocks(preElements);
  }, [isMounted, preElements, setCodeBlocks]);
};

export default useCodeBlocksTheme;
