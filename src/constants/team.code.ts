export const TEAM_CODE = {
  DEARDREAM: "DEARDREAM",
  INFLUEE: "INFLUEE",
  POPUPCYCLE: "POPUPCYCLE",
  PROMETHA: "PROMETHA",
  HONEYHOME: "HONEYHOME",
} as const;

export type TEAM_CODE_TYPE = keyof typeof TEAM_CODE;

/**
 * "typeof TEAM_NAME" means
 * type TEAM_NAME = {
    readonly DEARDREAM: "DEARDREAM";
    readonly INFLUEE: "INFLUEE";
    readonly POPUPCYCLE: "POPUPCYCLE";
    readonly PROMETHA: "PROMETHA";
    readonly HONEYHOME: "HONEYHOME";
  }
 */
