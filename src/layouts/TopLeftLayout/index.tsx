import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import antdZhCN from 'antd/es/locale/zh_CN';
import GlobalAuth from 'modules/GlobalAuth';
// import 'moment/locale/zh_CN';
import './index.less';

interface PropsType {
	children?: React.ReactNode;
}

const TopLeftLayout: FC<PropsType> = ({ children }) => {
	return (
		<ConfigProvider locale={antdZhCN}>
			<div className="layout">
				<div className="layout-header"></div>
				<div className="layout-content">
					<div className="layout-sider"></div>
					<div className="layout-main">{children}</div>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default GlobalAuth(TopLeftLayout);
