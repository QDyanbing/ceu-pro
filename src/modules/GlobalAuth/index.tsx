import React, { FC, useState, useEffect } from 'react';
import { defaultAuth, envAuth } from 'common/initAuth';
import { visitTreeItem, findTreeItem, modifyTreeAttribute, checkAuth } from 'common/util';
import { useModel, useLocation, history, Location } from 'umi';
import { Spin } from 'antd';
import './index.less';

// 模拟接口请求
function getAuth(): Promise<string[]> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([]);
		}, 3000);
	});
}

export interface PermissionType {
	key: string; // 权限码
	text?: string; // 提示
	auth?: boolean; // 是否有权限
	authType?: 'NONE' | 'UPGRADE'; // 权限类型
	children?: PermissionType;
}

export interface AuthModelType {
	permission: Array<PermissionType>;
}

export default (Component: React.FC) => {
	const GlobalAuth: FC = ({ ...props }) => {
		const [authLoaded, setAuthLoaded] = useState<boolean>(false);
		const location: Location = useLocation();
		const { permission, setPermission } = useModel('useAuthModel', model => ({
			permission: model.permission,
			setPermission: model.updataAuth,
		}));

		// 更新权限
		const updataAuth: Function = (oldAuth: Array<PermissionType>, newAuth: Array<PermissionType>): Array<PermissionType> => {
			const authArray: Array<PermissionType> = [...oldAuth];
			visitTreeItem(newAuth, (item: PermissionType) => {
				findTreeItem(authArray, item.key, (perm: PermissionType) => {
					Object.assign(perm, item);
				});
			});
			return authArray;
		};
		// 把整个项目里的权限全部关闭
		const closeDefaultAuth: Function = (authArray: Array<PermissionType>): Array<PermissionType> => {
			return modifyTreeAttribute([...authArray], 'auth', false);
		};
		// 初始化环境权限
		const initEnvAuth: Function = (authArray: Array<PermissionType>): Array<PermissionType> => {
			return updataAuth(authArray, envAuth);
		};
		// 初始化接口权限
		const initServerAuth: Function = (afterInitEnvAuth: Array<PermissionType>): void => {
			getAuth().then((res: string[]) => {
				const serverAuth: Array<PermissionType> = [...afterInitEnvAuth];
				res.forEach((code: string) => {
					findTreeItem(serverAuth, code, (perm: PermissionType) => {
						Object.assign(perm, {
							auth: true,
						});
					});
				});
				setPermission(serverAuth);
				setAuthLoaded(true);
			});
		};
		// 权限初始化
		const initAuth: Function = (): void => {
			const newPermission: Array<PermissionType> = [...defaultAuth];
			const afterCloseAuth: Array<PermissionType> = closeDefaultAuth(newPermission);
			const afterInitEnvAuth: Array<PermissionType> = initEnvAuth(afterCloseAuth);
			initServerAuth(afterInitEnvAuth);
		};

		const findRouteItem: Function = (routes: any, pathname: string, callback: Function): void => {
			routes.forEach((item: RouterType) => {
				if (item.path === pathname) {
					callback(item);
				} else if (item.routes) {
					findTreeItem(item.routes, pathname, callback);
				}
			});
		};

		const checkRouteAuth: Function = (): void => {
			if (authLoaded) {
				let activeRoute: any | undefined;
				findRouteItem(props.route.routes, location.pathname, (item: any) => {
					activeRoute = item;
				});

				if (activeRoute && activeRoute.code) {
					const hasAuth = checkAuth(permission || [], activeRoute.code);
					if (!hasAuth) {
						if (activeRoute.noAuthRedirect) {
							history.push(activeRoute.noAuthRedirect);
						}
					}
				}
			}
		};

		useEffect(() => {
			initAuth();
		});

		useEffect(() => {
			console.log(authLoaded, permission);
			checkRouteAuth();
		}, [permission, authLoaded]);

		if (!authLoaded) {
			return (
				<div className="ceu-modules-auth-loading">
					<Spin tip="权限加载中..." />
				</div>
			);
		}
		return <Component {...props} />;
	};

	return GlobalAuth;
};
