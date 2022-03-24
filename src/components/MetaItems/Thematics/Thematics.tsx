import { MetaKind } from '@ts/types/app';
import { ThematicPreview } from '@ts/types/taxonomies';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { MetaItem } from '..';

const Thematics = ({
  list,
  kind,
}: {
  list: ThematicPreview[];
  kind: MetaKind;
}) => {
  const intl = useIntl();

  const getThematics = () => {
    return list.map((thematic) => {
      return (
        <Link key={thematic.databaseId} href={`/thematique/${thematic.slug}`}>
          <a>{thematic.title}</a>
        </Link>
      );
    });
  };

  return (
    <MetaItem
      title={intl.formatMessage(
        {
          defaultMessage:
            '{thematicsCount, plural, =0 {Thematics:} one {Thematic:} other {Thematics:}}',
          description: 'Thematics: thematics list meta label',
          id: '1r4ujR',
        },
        { thematicsCount: list.length }
      )}
      values={getThematics()}
      kind={kind}
    />
  );
};

export default Thematics;
