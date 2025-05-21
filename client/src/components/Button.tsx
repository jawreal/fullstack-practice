import React, { memo, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

interface BUTTON_TYPE {
  onClick?: React.Dispatch<React.SetStateAction<boolean>> | (() => void); 
  className: string;
  text?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

const Button = ({ onClick, className, text, icon, type, children }: BUTTON_TYPE) => {

  const debouncedClick = useMemo(() => {
    return debounce(() => {
      if (onClick && typeof onClick === "function") {
        if (onClick.length === 1) {
          (onClick as React.Dispatch<React.SetStateAction<boolean>>)(false);
        } else {
          (onClick as () => void)();
        }
      }
    }, 500, { leading: true, trailing: false });
  }, [onClick]);

  const handleClick = useCallback(() => {
    debouncedClick();
  }, [debouncedClick]);
  
  useEffect(() => {
    return () => {
      debouncedClick.cancel();
    }
  }, [debouncedClick])

  return (
    <button type={type ?? "button"} className={`cursor-pointer ${className}`} onClick={handleClick}>
      {(icon && !children) && <span>{icon}</span>}
      {(text && !children) && <span>{text}</span>}
      {children && children}
    </button>
  );
};

export default memo(Button);
