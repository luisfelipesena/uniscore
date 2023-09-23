import { HtmlHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

type LayoutProps = HtmlHTMLAttributes<HTMLDivElement>;

export const Layout = ({ children, className, ...rest }: LayoutProps) => {
  return (
    <section
      className={classnames(styles.layoutContainer, className)}
      {...rest}
    >
      <div className={styles.layout}>{children}</div>
    </section>
  );
};
