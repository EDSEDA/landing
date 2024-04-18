import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import cn from 'classnames'
import './button.css';
import { HashLink as Link } from "react-router-hash-link";

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
}

export const Button = (props: ButtonProps) => {
    let content = props.children

    if (props.href) {
        content = (
            <Link className='button_href' to={props.href}>
                {content}
            </Link>
        )
    }

    return (
        <button {...props} className={cn('button', props.className)}>
        {content}
        </button>
    );
}
