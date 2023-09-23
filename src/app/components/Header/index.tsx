import { HtmlHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

type HeaderProps = HtmlHTMLAttributes<HTMLHeadElement>;

export const Header = ({ children, className, ...rest }: HeaderProps) => {
  return (
    <header className={styles.headerContainer} {...rest}>
      <div className={classnames(styles.header, className)}>{children}</div>
    </header>
  );
};
