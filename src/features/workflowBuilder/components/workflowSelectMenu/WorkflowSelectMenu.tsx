import { Button, Flex, List, Menu, Tooltip, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, FileExcelOutlined } from '@ant-design/icons';
import { transformWorkflowNameToKey, truncateString } from '@/util';
import './_workflowSelectMenu.scss';

type WorkflowSelectMenuProps = {
    workflows: string[];
    onClickNewWorkflow: () => void;
    onSelectWorkflow: (workflowName: string) => void;
    currentWorkflowName: string;
    onDelete: (workflowName: string) => void;
};

function WorkflowSelectMenu(props: WorkflowSelectMenuProps) {
    const [selectedKey, setSelectedKey] = useState<string[]>([]);

    useEffect(() => {
        setMenuItems(generateMenuItems());
    }, [props.workflows]);

    const getSelectedKeys = () => {
        const key = transformWorkflowNameToKey(props.currentWorkflowName);
        return [key];
    }

    const handleSelectWorkflow = (workflowName: string) => {
        props.onSelectWorkflow(workflowName);
        const key = transformWorkflowNameToKey(workflowName);
        setSelectedKey([key]);
    }
    const generateMenuItems = () => {
        const menuItems = props.workflows.map((workflowName, index) => ({
            key: `workflow_${index}`,
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className='workflow-title' onClick={() => handleSelectWorkflow(workflowName)}>{truncateString(workflowName, 17)}</span>
                    <Tooltip title="Delete workflow" placement='right'>
                        <Button
                            size="small"
                            icon={<DeleteOutlined style={{ fontSize: '16px', color: '#FFFF' }} />}
                            onClick={() => props.onDelete(workflowName)}
                            type="text"
                            shape='circle'
                        />
                    </Tooltip>
                </div>
            ),
        }));
        return menuItems;
    };

    const [menuItems, setMenuItems] = useState(generateMenuItems());


    if (menuItems.length === 0) {
        return (
            <Flex align='center' justify='center' vertical className='empty-list' gap={16}>
                <FileExcelOutlined />
                <Typography.Paragraph>No workflows.</Typography.Paragraph>
                <Button type='primary' onClick={props.onClickNewWorkflow}>Add workflow</Button>
            </Flex>
        );
    } else {
        return (
            <div className='workflow-menu-wrapper'>
                <Menu
                    theme="dark"
                    items={menuItems}
                    className='workflow-select-menu'
                    selectedKeys={selectedKey}
                />
                < Button type='primary' onClick={props.onClickNewWorkflow} > Add workflow</Button >
            </div >
        );
    }
}

export default WorkflowSelectMenu;
