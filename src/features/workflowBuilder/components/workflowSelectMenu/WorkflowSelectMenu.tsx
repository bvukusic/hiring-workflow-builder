import { Menu } from 'antd';
import { useState } from 'react';
import './_workflowSelectMenu.scss';

type WorkflowSelectMenuProps = {
    workflows: any;
};

function WorkflowSelectMenu(props: WorkflowSelectMenuProps) {

    const [savedWorkflows, setSavedWorkflows] = useState([
        {
            id: '1',
            key: '1',
            label: 'Workflow 1',
        },
        {
            id: '1',
            key: '2',
            label: 'Workflow 2',
        }
    ]);

    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            items={savedWorkflows}
            className='workflow-select-menu'
        />
    );
}

export default WorkflowSelectMenu;