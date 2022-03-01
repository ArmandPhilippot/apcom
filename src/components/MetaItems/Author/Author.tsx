import { MetaKind } from '@ts/types/app';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const Author = ({ name, kind }: { name: string; kind: MetaKind }) => {
  const intl = useIntl();

  return (
    <MetaItem
      title={intl.formatMessage({
        defaultMessage: 'Written by:',
        description: 'Author: article author meta label',
      })}
      value={name}
      kind={kind}
    />
  );
};

export default Author;
