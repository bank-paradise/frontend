/**
 * -----------------------------------------------------------------------------
 *                   Lvl 1:           Lvl 2:           Lvl 3:           Lvl 4:
 * - member           x                 -                 -                 -
 * - moderator        x                 x                 -                 -
 * - admin            x                 x                 x                 -
 * - owner            x                 x                 x                 x
 * -----------------------------------------------------------------------------
 */

const checkPermissions = (user, level) => {
  const { community_role } = user;

  if (!community_role) return false;

  let roles = [];

  switch (level) {
    case 1:
      roles = ["member", "moderator", "admin", "owner"];
      break;
    case 2:
      roles = ["moderator", "admin", "owner"];
      break;
    case 3:
      roles = ["admin", "owner"];
      break;
    case 4:
      roles = ["owner"];
      break;
    default:
      break;
  }

  return roles.includes(community_role);
};

export default checkPermissions;
