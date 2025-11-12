import { useEffect, useRef, useState } from "react";
import "./Toast.css";
import { Button } from "../Button";

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onExpire?: () => void;
  duration: number;
}

export function UndoToast({
  message,
  onUndo,
  onExpire,
  duration,
}: UndoToastProps) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration && !expired) {
        setExpired(true);
        onExpire?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration, expired, onExpire]);

  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const handleUndo = () => {
    if (!expired) {
      onUndo();
    }
  };

  return (
    <div className="undo-toast">
      <div className="undo-toast__content">
        <span className="undo-toast__message">{message}</span>
        <Button
          className="undo-toast__btn"
          onClick={handleUndo}
          disabled={expired}
        >
          Undo
        </Button>
      </div>
    </div>
  );
}
