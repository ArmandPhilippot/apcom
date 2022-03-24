import { ExpandableWidget } from '@components/WidgetParts';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import styles from './CVPreview.module.scss';

const CVPreview = ({
  title,
  imgSrc,
  pdf,
}: {
  title: string;
  imgSrc: string;
  pdf: string;
}) => {
  return (
    <ExpandableWidget title={title} expand={true}>
      <div className={styles.preview}>
        <Image
          src={imgSrc}
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt="CV Armand Philippot"
        />
      </div>
      <p>
        <FormattedMessage
          defaultMessage="Download <link>CV in PDF</link>"
          description="CVPreview: download as PDF link"
          id="xC3Khf"
          values={{
            link: (chunks: string) => (
              <Link href={pdf}>
                <a>{chunks}</a>
              </Link>
            ),
          }}
        />
      </p>
    </ExpandableWidget>
  );
};

export default CVPreview;
