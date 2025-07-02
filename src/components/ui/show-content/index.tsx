type ShowContentProps = {
  children: React.ReactNode;
  condition?: boolean;
};

export const ShowContent = ({ children, condition }: ShowContentProps) => {
  return condition ? <>{children}</> : null;
};
