import { WorkspaceRole } from "@prisma/client/postgres";

export type Permission =
  | "workspace:read"
  | "workspace:manage"
  | "member:invite"
  | "member:remove"
  | "post:create"
  | "post:comment"
  | "activity:read";

export const ROLE_PERMISSIONS: Record<WorkspaceRole, Permission[]> = {
  OWNER: [
    "workspace:read",
    "workspace:manage",
    "member:invite",
    "member:remove",
    "post:create",
    "post:comment",
    "activity:read",
  ],

  ADMIN: [
    "workspace:read",
    "member:invite",
    "member:remove",
    "post:create",
    "post:comment",
    "activity:read",
  ],

  MEMBER: [
    "workspace:read",
    "post:create",
    "post:comment",
    "activity:read",
  ],

  VIEWER: [
    "workspace:read",
    "activity:read",
  ],
};