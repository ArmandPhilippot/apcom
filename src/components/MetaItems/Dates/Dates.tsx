import { MetaKind } from '@ts/types/app';
import { settings } from '@utils/config';
import { getFormattedDate } from '@utils/helpers/format';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const Dates = ({
  publication,
  update,
  kind,
}: {
  publication: string;
  update: string;
  kind: MetaKind;
}) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const validLocale = locale ? locale : settings.locales.defaultLocale;

  const publicationDate = getFormattedDate(publication, validLocale);
  const updateDate = getFormattedDate(update, validLocale);

  return (
    <>
      <MetaItem
        title={intl.formatMessage({
          defaultMessage: 'Published on:',
          description: 'Dates: publication date meta label',
        })}
        values={[
          <time key={publication} dateTime={publication}>
            {publicationDate}
          </time>,
        ]}
        kind={kind}
      />
      {publicationDate !== updateDate && (
        <MetaItem
          title={intl.formatMessage({
            defaultMessage: 'Updated on:',
            description: 'Dates: update date meta label',
          })}
          values={[
            <time key={update} dateTime={update}>
              {updateDate}
            </time>,
          ]}
          kind={kind}
        />
      )}
    </>
  );
};

export default Dates;
