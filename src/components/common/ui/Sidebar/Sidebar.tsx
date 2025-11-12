import "./Sidebar.css";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "320px",
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar__overlay" onClick={onClose} />

      <aside className="sidebar" style={{ width }}>
        <header className="sidebar__header">
          {title && <h2 className="sidebar__title">{title}</h2>}

          <button className="sidebar__close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="sidebar__content">{children}</div>

        {footer && <div className="sidebar__footer">{footer}</div>}
      </aside>
    </>
  );
};
