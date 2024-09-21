import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    className,
    type = 'text',
    autoComplete,
    size,
    ariaLabel,
    required,
    value,      // Add value prop
    onChange,   // Add onChange prop
  },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
          value={value}         // Pass value to input
          onChange={onChange}   // Pass onChange to input
        />
      </label>
    </div>
  );
});

export default Input;
