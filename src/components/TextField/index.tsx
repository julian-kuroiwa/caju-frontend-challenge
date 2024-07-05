import { InputHTMLAttributes, forwardRef } from 'react';
import * as S from './styles';

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = forwardRef((props: Props, ref) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input {...props} ref={ref} />
      <S.ErrorMessage
        data-testid={`error-message-${props.id}`}>
        {props.error}
      </S.ErrorMessage>
    </div>
  );
});

export default TextField;
