import { Button, Flex, Menu, MenuProps, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FileExcelOutlined } from '@ant-design/icons';
import './_workflowSelectMenu.scss';

type MenuItem = Required<MenuProps>['items'][number];

type WorkflowSelectMenuProps = {
    workflows: MenuItem[];
};

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    theme?: 'light' | 'dark',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        theme,
    } as MenuItem;
}

function WorkflowSelectMenu(props: WorkflowSelectMenuProps) {
    const [menuItems, setMenuItems] = useState(props.workflows);

    if (menuItems.length === 0) {
        return (
            <Flex align='center' justify='center' vertical className='empty-list' gap={16}>
                <FileExcelOutlined />
                <Typography.Paragraph>No workflows.</Typography.Paragraph>
            </Flex>
        )
    }
    else {
        return (
            <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
                items={menuItems}
                className='workflow-select-menu'
            />
        );
    }
}

export default WorkflowSelectMenu;