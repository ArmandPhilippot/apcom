import { MetaKind } from '@ts/types/app';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const Website = ({ url, kind }: { url: string; kind: MetaKind }) => {
  const intl = useIntl();

  return (
    <MetaItem
      title={intl.formatMessage({
        defaultMessage: 'Website:',
        description: 'Website: website meta label',
      })}
      value={<a href={url}>{url}</a>}
      kind={kind}
    />
  );
};

export default Website;
