import Field, { type FieldProps } from '@components/atoms/forms/field';
import Label from '@components/atoms/forms/label';
import { FC } from 'react';

type LabelledFieldProps = FieldProps & {
  label: string;
};

const LabelledField: FC<LabelledFieldProps> = ({
  id,
  label,
  required,
  ...props
}) => {
  return (
    <>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Field id={id} required={required} {...props} />
    </>
  );
};

export default LabelledField;
