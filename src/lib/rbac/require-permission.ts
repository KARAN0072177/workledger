import { ROLE_PERMISSIONS, Permission } from "./permissions";
import { resolveWorkspaceContext } from "./workspace-context";

export async function requirePermission(
  workspaceId: string,
  permission: Permission
) {
  const context = await resolveWorkspaceContext(workspaceId);

  const allowed = ROLE_PERMISSIONS[context.role].includes(permission);

  if (!allowed) {
    throw new Error("INSUFFICIENT_PERMISSION");
  }

  return context;
}