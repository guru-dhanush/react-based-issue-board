import { useState } from "react";
import { Permission } from "../types";
import {
  hasPermission,
  isAdmin as checkIsAdmin,
} from "../utils/permissionUtils";
import { currentUser } from "../constants/currentUser";

//Role based Permissions
//we can keep one global state in store . for now I kept it simple with one custom hook
function usePermissions() {
  const [user] = useState(currentUser);

  const can = (permission: Permission): boolean => {
    return hasPermission(user.role, permission);
  };

  const isAdmin = checkIsAdmin(currentUser);

  return { can, isAdmin, role: currentUser.role };
}

export default usePermissions;
