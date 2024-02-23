import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  onClickAway: () => void;
  children: ReactNode;
  target?:HTMLElement | null;
};

export default function ClickawayListener({ onClickAway, children , target}: Props) {
  const elementRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    function callback(e: Event) {
      if (!elementRef.current?.contains(e.target as Node)) {
        onClickAway();
      }
    }

    const targetElement = target ?? document;
    targetElement.addEventListener("click", callback);

    return () => {
      targetElement.removeEventListener("click", callback);
    };
  }, []);

  return <div ref={elementRef}>{children}</div>;
}
