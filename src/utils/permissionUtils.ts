import { Role, Permission, User } from '../types';
import { PERMISSIONS } from '../constants/permissions';

export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSIONS[role].includes(permission);
}

export function userCan(user: User, permission: Permission): boolean {
  return hasPermission(user.role, permission);
}

export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

export function getRolePermissions(role: Role): Permission[] {
  return PERMISSIONS[role];
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}
