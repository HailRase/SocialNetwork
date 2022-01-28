import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './CustomButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type CustomButtonPropsType = DefaultButtonPropsType & {
    purple?: boolean
}
const CustomButton = ({
                          className,
                          purple,
                          ...restProps
                      }: CustomButtonPropsType) => {

    const finalClassName = `${purple ? s.purple : s.default} ${className}`
    return (
        <button className={finalClassName} {...restProps}/>
    );
};

export default CustomButton;