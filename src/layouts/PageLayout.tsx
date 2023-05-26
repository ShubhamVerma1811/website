import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import React from 'react';

export const PageLayout: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div className='mx-6 my-5 max-w-4xl sm:mx-12 md:mx-32 lg:mx-auto'>
      <Header />
      <main>
        {props.title && (
          <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
            {props.title}
          </p>
        )}
        {props.children}
      </main>
      <Footer />
    </div>
  );
};
