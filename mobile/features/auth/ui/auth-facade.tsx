type Props = {
  className?: string;
};

export const AuthFacade = (props: Props) => {
  const { className } = props;
  return <div className={className}></div>;
};
