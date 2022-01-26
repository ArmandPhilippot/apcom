import { ReactChildren } from 'react';

const Link = ({
  children,
  target,
  isExternal = false,
  lang,
}: {
  children: ReactChildren;
  target: string;
  isExternal: boolean;
  lang?: string;
}) => {
  const className = isExternal ? 'external' : '';

  return (
    <a href={target} className={className} hrefLang={lang}>
      {children}
    </a>
  );
};

export default Link;
