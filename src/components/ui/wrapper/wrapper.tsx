import { ReactNode } from 'react';

type TWrapperProps = {
  title: string;
  children: ReactNode;
};

export const Wrapper = ({ title, children }: TWrapperProps) => (
  <div
    style={{
      margin: '0 auto'
    }}
  >
    <h3
      style={{
        textAlign: 'center',
        fontFamily: 'Jet Brains Mono',
        fontSize: '36px',
        fontWeight: 'bold',
        lineHeight: 1.1
      }}
    >
      {title}
    </h3>
    <div>{children}</div>
  </div>
);
