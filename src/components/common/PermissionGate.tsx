import React, { ReactNode } from "react";
import { Permission } from "../../types";
import usePermissions from "../../hooks/usePermissions";

interface PermissionGateProps {
  permission: Permission;
  fallback?: ReactNode;
  children: ReactNode;
}

export function PermissionGate({
  permission,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { can } = usePermissions();

  if (!can(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function ReadOnlyBadge() {
  return (
    <div className="read-only-badge">
      <span>Read Only</span>
    </div>
  );
}
