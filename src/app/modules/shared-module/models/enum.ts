export const adminPermissions: string[] = [
  'Permissions.User.View',
  'Permissions.User.Create',
  'Permissions.User.Edit',
  'Permissions.User.Delete',
  'Permissions.Project.View',
  'Permissions.Project.Create',
  'Permissions.Project.Edit',
  'Permissions.Project.Delete',
  'Permissions.Goal.View',
  'Permissions.Goal.Create',
  'Permissions.Goal.Edit',
  'Permissions.Goal.Delete',
  'Permissions.Request.View',
  'Permissions.Request.Create',
  'Permissions.Request.Edit',
  'Permissions.Request.Delete',
  'Permission.UserRoles.view',
];
export const userRoles: string[] = ['Approver', 'Requester', 'Admin'];
export const tableData = [
  {
    num: '01',
    name: 'Admin',
    description: 'Admin can setup the settings (Projects - Goals - Users)',
    isActive: true,
    action: 'Build In',
  },
  {
    num: '02',
    name: 'Requester',
    description: 'Requester can add the requests and send them to the approved',
    isActive: false,
    action: 'Build In',
  },
  {
    num: '03',
    name: 'Approver',
    description: 'Approve or reject the requests',
    isActive: true,
    action: 'Build In',
  },
];
export const objectivesDataDtos = [
  {
    id: '01',
    name: 'Lorem Ipsum',
    isActive: true,
  },
  {
    num: '02',
    name: 'Lorem Ipsum',
    isActive: false,
  },
  {
    num: '03',
    name: 'Lorem Ipsum',
    isActive: true,
  },
];
export const projectsDataDtos = [
  {
    num: '01',
    name: 'Lorem Ipsum',
    environments: 1,
    isActive: true,
  },
  {
    num: '02',
    name: 'Lorem Ipsum',
    environments: 3,
    isActive: false,
  },
  {
    num: '03',
    name: 'Lorem Ipsum',
    environments: 2,
    isActive: true,
  },
];
export const membersDataDtos = [
  {
    num: '01',
    name: 'Lorem Ipsum',
    email: 'lorem.ipsum@gmail.com',
    userRoles: 'Requester, Admin, Approver',
    isActive: true,
  },
  {
    num: '02',
    name: 'Lorem Ipsum',
    email: 'lorem.ipsum@gmail.com',
    userRoles: 'Requester, Admin',
    isActive: false,
  },
  {
    num: '03',
    name: 'Lorem Ipsum',
    email: 'lorem.ipsum@gmail.com',
    userRoles: 'Requester, Approver',
    isActive: true,
  },
];

// to check if the logged user is an admin or not
export const isAdmin = (userPermissions: string[]): boolean => {
  return adminPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

export const tableRoleHeaderValues = {
  num: 'Role Number',
  name: 'Role Name',
  description: 'Role Description',
  isActive: 'Is Active',
  action: 'Action',
};
export const objectiveRoleHeaderValues = {
  num: 'Objective Number',
  name: 'Objective Name',
  isActive: 'Is Active',
  action: 'Action',
};
export const projectsRoleHeaderValues = {
  num: 'Project Number',
  name: 'Project Name',
  environments: 'Number of environments',
  isActive: 'Is Active',
  action: 'Action',
};
export const membersHeaderValues = {
  num: 'User Number',
  name: 'Full Name',
  email: 'Email Address',
  roles:"User Roles",
  approval:"Environment Approval",
  environments: 'Number of environments',
  isActive: 'Is Active',
  action: 'Action',
};
