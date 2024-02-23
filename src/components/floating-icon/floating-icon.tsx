import React, { FunctionComponent, useRef, useState } from "react";
import styles from "./floating-icon.module.css";
import { ClickAwayListener } from "../clickaway-listener";

type IProps = {
  position: string;
};
function classNames(...args: string[]) {
  return args.join(" ");
}
const FloatingIcon: FunctionComponent<IProps> = ({ position }) => {
  const [openSelection, setOpenSelection] = useState(false);
  const backdropRef = useRef<HTMLDivElement| null>(null);
  function handleClick() {
    setOpenSelection(true);
  }

  return (
      <>
      <div ref={backdropRef} style={{display: openSelection ? 'block' : 'none'}} className={classNames(styles.backdrop)}></div>
    <ClickAwayListener target={backdropRef.current} onClickAway={() => setOpenSelection(false)}>
      <div
        style={{
          display: openSelection ? "flex" : "none",
          flexDirection: "column",
          width: 50,
          height: 50,
        }}
      >
        <button className={classNames(styles.floatingIcon, styles.iconOne)}>
          A
        </button>
        <button className={classNames(styles.floatingIcon, styles.iconTwo)}>
          B
        </button>
        <button className={classNames(styles.floatingIcon, styles.iconThree)}>
          C
        </button>
      </div>
      <button
        onClick={handleClick}
        className={styles.floatingIcon}
        style={{ display: openSelection ? "none" : "" }}
      >
        +
      </button>
    </ClickAwayListener>
</>  );
};

export default FloatingIcon;
