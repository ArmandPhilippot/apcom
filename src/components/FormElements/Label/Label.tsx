import styles from './Label.module.scss';

type LabelKind = 'regular' | 'settings';

const Label = ({
  body,
  htmlFor,
  required = false,
  kind = 'regular',
}: {
  body: string;
  htmlFor: string;
  required?: boolean;
  kind?: LabelKind;
}) => {
  return (
    <label htmlFor={htmlFor} className={styles[kind]}>
      {body}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
};

export default Label;
