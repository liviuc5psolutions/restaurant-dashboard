import React from 'react';
import { useTitle } from 'react-use';

type AppPageProps = {
  title?: string,
  className?: string
}


export const AppPage: React.FC<AppPageProps> = ({title, children}) => {
  useTitle(title ? `${title} | 5Pini` : '5Pini');

  return (
    <>
      {children}
    </>
  );
};
