
import { useLayoutEffect } from 'react';

export function useLockBodyScroll(isLocked: boolean): void {
  useLayoutEffect(() => {
    if (!isLocked) {
      return;
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
}
