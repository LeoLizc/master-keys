export type MasterData = IProtoMasterAction[];

export interface IProtoMasterAction {
  id: string;
  title: string;
  hotkey?: string;
  handler?: Function;
  mdIcon?: string;
  icon?: string;
  parent?: string;
  keywords?: string;
  children?: (string | IProtoMasterAction)[];
  section?: string;
}

export type IMasterAction = {
  id?: string;
  title: string;
  hotkey?: string;
  handler?: Function;
  mdIcon?: string;
  icon?: string;
  keywords?: string;
  section?: string;
} | {
  id: string;
  title: string;
  hotkey?: string;
  handler?: Function;
  mdIcon?: string;
  icon?: string;
  parent?: string;
  keywords?: string;
  children?: (string | IMasterAction)[];
  section?: string;
};
