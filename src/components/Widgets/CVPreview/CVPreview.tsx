import { ExpandableWidget } from '@components/WidgetParts';
import { Trans } from '@lingui/macro';
import Image from 'next/image';
import Link from 'next/link';
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
        <Trans>
          Download <Link href={pdf}>CV in PDF</Link>
        </Trans>
      </p>
    </ExpandableWidget>
  );
};

export default CVPreview;
