import { ReactNode, useState } from 'react';
import {
    ApartmentOutlined,
    BuildOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './_appLayout.scss';

const { Sider, Content } = Layout;

type AppLayoutProps = {
    children: ReactNode;
}

function AppLayout(props: AppLayoutProps) {
    return (
        <Layout className='hwb-app-layout'>
            <Sider trigger={null} collapsible collapsed={true}>
                <div className='hwb-logo-wrapper'>
                    <div className="hwb-logo">
                        <TeamOutlined />
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    className='main-app-menu'
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <ApartmentOutlined />,
                            label: 'Manage workflows',
                        },
                        {
                            key: '2',
                            icon: <BuildOutlined />,
                            label: 'Templates',
                            disabled: true,
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Content>
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
