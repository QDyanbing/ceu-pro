interface TreeType {
	children?: TreeType[];
	key?: string;
}

export const visitTreeItem: Function = (tree: TreeType[], callback: Function): void => {
	tree.forEach((item: TreeType) => {
		callback(item);
		if (item.children) {
			visitTreeItem(item.children, callback);
		}
	});
};

export const findTreeItem: Function = (tree: TreeType[], code: string, callback: Function): void => {
	tree.forEach((item: TreeType) => {
		if (item.key === code) {
			callback(item);
		} else if (item.children) {
			findTreeItem(item.children, code, callback);
		}
	});
};

export const modifyTreeAttribute: Function = (tree: any[], attr: string, value: any): any[] => {
	const newArr: any[] = [];
	tree.forEach((item: any) => {
		if (item.children) {
			newArr.push({
				...item,
				[attr]: value,
				children: [...modifyTreeAttribute(item.children, attr, value)],
			});
		} else {
			newArr.push({ ...item, [attr]: value });
		}
	});
	return newArr;
};

export const checkAuth: Function = (permission: TreeType[], code: string): boolean => {
	let hasAuth: boolean = false;
	findTreeItem(permission, code, (item: any) => {
		hasAuth = item.auth;
	});
	return hasAuth;
};
