import { FC, HTMLProps } from 'react';
import cn from 'classnames';
import './PageLink.css'

type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

const PageLink:FC<Props> =({
  className,
  active,
  disabled,
  children,
  ...otherProps
}) => {
  console.log(children)
  const customClassName = cn('page-link', className, {
    active,
    disabled,
  });

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a
      className={customClassName}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}

export default PageLink