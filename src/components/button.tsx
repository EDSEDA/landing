import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import cn from 'classnames'
import './button.css';

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
}

export const Button = (props: ButtonProps) => {
    let content = props.children

    if (props.href) {
        content = (
        <a className='button_href' href={props.href}>
            {content}
        </a>
        )
    }

    return (
        <button {...props} className={cn('button', props.className)}>
        {content}
        </button>
    );
}
