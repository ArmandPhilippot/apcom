import Label from '@components/atoms/forms/label';
import Select, { type SelectProps } from '@components/atoms/forms/select';
import { FC } from 'react';

type LabelledSelectProps = SelectProps & {
  label: string;
};

const LabelledSelect: FC<LabelledSelectProps> = ({
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
      <Select id={id} required={required} {...props} />
    </>
  );
};

export default LabelledSelect;
