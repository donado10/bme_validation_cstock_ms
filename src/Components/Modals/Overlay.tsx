import React, { ReactElement, useEffect } from "react";
import ReactDOM from "react-dom";

const MyPortal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  modal: ReactElement;
}> = ({ isOpen, onClose, modal }) => {
  const el = document.createElement("div");
  el.id = "overlay";
  el.classList.value =
    "fixed inset-0 w-screen h-100% bg-black/75 flex items-center justify-center";
  el.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("overlay")) {
      onClose();
    }
    return;
  });

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="overlay flex h-full w-full items-center justify-center">
      {modal}
    </div>,
    el,
  );
};

export default MyPortal;
