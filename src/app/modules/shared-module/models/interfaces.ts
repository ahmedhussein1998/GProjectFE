export interface linksDto {
  linkName: string,
  linkIconSrc: string,
  elementContent: string
}

export interface tableDataDto {
  num?: string,
  name?: string,
  description?: string,
  action?: string
}

export interface tableRoleHeaderDto {
  num?: string,
  name?: string,
  email?: string,
  roles?: string,
  approval?: string,
  description?: string,
  environments?: number
  isActive?: boolean,
  action?: string
};

export interface objectivesDataDto {
  id?: string,
  name?: string,
  isActive?: boolean,
}

export interface projectsDataDto {
  id?: string;
  name?: string;
  countOfEnvironments?: number;
  isActive?: boolean;
  normalizedName?: string;
  concurrencyStamp?: string;
}
export interface environments {
  name: string,
  hostName: string,
  dbServerName: string,
  ddl: string,
  dml: string,
  userName: string,
  password: string,
}

export interface singleProjectDataDto {
  name?: string,
  environments: environments[],
  isActive: boolean,
  isDeleted: boolean
}

export interface editProject {
  id?: string,
  name?: string,
  environments: environments[],
  isActive: boolean,
  isDeleted: boolean
}

export interface membersDataDto {
  num: string,
  name: string,
  email: string,
  userRoles: string
  isActive: boolean,
}

export interface Error {
  code: string;
  description: string;
  type: number;
  numericType: number;
}

export interface Value {
  items: projectsDataDto[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface FirstError {
  code: string;
  description: string;
  type: number;
  numericType: number;
}

export interface IResponse {
  isError: boolean;
  errors: Error[];
  errorsOrEmptyList: any[];
  value: Value;
  firstError: FirstError;
}
