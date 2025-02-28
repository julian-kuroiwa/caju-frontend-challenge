import * as S from './styles';

type Props = {
  loading: boolean;
};

const SpinnerLoadingScreen = ({ loading }: Props) => {
  return (
    loading && (
      <S.Container date-testid="loader">
        <S.Spinner />
      </S.Container>
    )
  );
};

export default SpinnerLoadingScreen;
