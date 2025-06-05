import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useKeyPress } from "src/hooks/useKeyPress";

interface UseModalReturn {
  isOpen: boolean;
  isSuccess: boolean;
  hasInteracted: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  setHasInteracted: (value: boolean) => void;
  setIsSuccess: (value: boolean) => void;
}

const ModalContext = createContext<UseModalReturn | undefined>(undefined);

interface ModalContextProviderProps {
  children: ReactNode;
}

/**
 * ModalContextProvider is a React context provider component that manages the state
 * and behavior of a modal dialog. It handles opening, closing, and user interactions
 * within the modal, as well as responding to specific keypress events such as the Escape key.
 *
 * This component provides the following functionality:
 * - Tracks whether the modal is open or closed via the `isOpen` state.
 * - Tracks whether a user has interacted with the modal using the `hasInteracted` state.
 * - Listens for the Escape key to close the modal optionally after user confirmation,
 *   depending on interaction status.
 * - Exposes functions to open and close the modal programmatically.
 *
 * Props:
 * - `children` (React.ReactNode): The child components that will consume the modal context.
 *
 * Context Value:
 * The following values are exposed via the ModalContext for consumption in child components:
 * - `isOpen` (boolean): Indicates whether the modal is currently open.
 * - `hasInteracted` (boolean): Indicates whether the user has interacted with the modal.
 * - `handleOpenModal` (function): Function to open the modal.
 * - `handleCloseModal` (function): Function to close the modal.
 * - `setHasInteracted` (function): Function to update the `hasInteracted` state.
 *
 * This component is designed to be used with the ModalContext consumer to manage modal state and behavior.
 */
export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { keyPressed: escapePressed, setKeyPressed } = useKeyPress("Escape");

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (!isSuccess && hasInteracted) {
      const confirmed = window.confirm(
        "Are you sure you want to close the survey? Your answers will be lost."
      );
      if (!confirmed) {
        return;
      }
    }
    setIsOpen(false);
    setHasInteracted(false);
    setKeyPressed(false);
  }, [hasInteracted, isSuccess, setKeyPressed]);

  // Handle escape key press
  useEffect(() => {
    if (escapePressed && isOpen) {
      handleCloseModal();
    }
  }, [escapePressed, isOpen, handleCloseModal]);

  const contextValue: UseModalReturn = {
    isOpen,
    hasInteracted,
    handleOpenModal,
    handleCloseModal,
    setHasInteracted,
    isSuccess,
    setIsSuccess,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * A custom hook that provides access to the modal context.
 *
 * This hook allows components to interact with modals, such as opening or closing them,
 * by using the `ModalContext` that must be provided via a `ModalContextProvider`.
 *
 * @throws {Error} Throws an error if the hook is used outside a `ModalContextProvider`.
 *
 * @returns {UseModalReturn} The context object for managing modals.
 */
export const useModal = (): UseModalReturn => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }
  return context;
};
