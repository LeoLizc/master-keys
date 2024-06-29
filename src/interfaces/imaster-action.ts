export type MasterData = IProtoMasterAction[];

export type MasterHandler = () => ({ keepOpen: boolean } | void);

export interface IProtoMasterAction {
  id: string;
  title: string;
  hotkey?: string;
  handler?: MasterHandler;
  icon?: string;
  parent?: string;
  keywords?: string;
  children?: (string | IProtoMasterAction)[];
  section?: string;
}

export interface IUniqueMasterAction {
  id: string;
  title: string;
  hotkey?: string;
  handler?: MasterHandler;
  icon?: string;
  keywords?: string;
  section?: string;
}

export interface IFlatMasterAction extends IUniqueMasterAction {
  parent?: string;
  children?: string[];
}

export interface INestedMasterAction extends IUniqueMasterAction {
  parent?: string;
  children?: IMasterAction[];
}

export type IMasterAction = IFlatMasterAction | INestedMasterAction;
