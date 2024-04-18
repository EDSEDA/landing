import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import cn from 'classnames'
import './button.css';
import { HashLink as Link } from "react-router-hash-link";

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    clear?: boolean;
}

export const Button = (props: ButtonProps) => {
    const { children, href, clear, className } = props;
    let content = children

    if (href) {
        content = (
            <Link className='button_href' to={href}>
                {content}
            </Link>
        )
    }

    return (
        <button {...props} className={cn(!clear && 'button', className)}>
        {content}
        </button>
    );
}
