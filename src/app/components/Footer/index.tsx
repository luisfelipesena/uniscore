import { HtmlHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

type FooterProps = HtmlHTMLAttributes<HTMLDivElement>;

export const Footer = ({ children, className, ...rest }: FooterProps) => {
  return (
    <footer className={classnames(styles.footerContainer, className)} {...rest}>
      {children}
    </footer>
  );
};
