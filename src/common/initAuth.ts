import type { PermissionType } from 'modules/GlobalAuth';

// 整个项目的权限，初始化为所有功能添加所有权限
export const defaultAuth: Array<PermissionType> = [{ key: 'test_page_index', text: '首页' }];

// 环境权限，当前环境有什么权限就记录什么权限
export const envAuth: Array<PermissionType> = [{ key: 'test_page_index', text: '首页', authType: 'NONE', auth: false }];
