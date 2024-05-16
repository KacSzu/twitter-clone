import {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOnOutsideClick } from "../../hooks/use-on-outside-click";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

function Open({ children, opens }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Open must be used within a ModalProvider");
  }
  const { open } = context;

  return cloneElement(children, {
    onClick: () => {
      open(opens);
    },
  });
}

interface WindowProps {
  children: ReactNode;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Window must be used within a ModalProvider");
  }
  const { openName, close } = context;

  const ref = useOnOutsideClick<HTMLDivElement>(close);
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-white bg-opacity-10 backdrop-blur-sm transition-all duration-500">
      <div
        ref={ref}
        className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform rounded-[30px] bg-black shadow-lg  transition-all duration-500"
      >
        <button onClick={close}>
          <span className="fixed right-6 text-xl">
            <HiXMark />
          </span>
        </button>
        {cloneElement(children as ReactElement, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
