import { Button, Layout, Menu, MenuProps, Modal } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useCallback, useState } from 'react';
import WorkflowBuilder from '@/features/workflowBuilder/components/workflowBuilder/WorkflowBuilder';
import { Edge, Node, Position, ReactFlowInstance, ReactFlowJsonObject, ReactFlowProvider } from 'reactflow';
import './_workflowBuilderContainer.scss';
import NodeMenu from '@/features/workflowNodes/components/nodeMenu/NodeMenu';
import WorkflowSelectMenu from '@/features/workflowBuilder/components/workflowSelectMenu/WorkflowSelectMenu';
import NewWorkflowModal from '@/features/workflowBuilder/components/newWorkflowModal/NewWorkflowModal';
import { starterWorkflowObject } from '@/features/workflowBuilder/utils/types';

const sideMenuOptions = [
    {
        key: 'workflows',
        label: 'Workflows',
    },
    {
        key: 'nodes',
        label: 'Nodes',
    }
]

type WorkflowBuilderContainerProps = {
}

const initialNodes: Node[] = [
    {
        id: 'onReceiveCandidate-0',
        sourcePosition: Position.Right,
        type: 'onReceiveCandidateNode',
        data: {},
        position: { x: 0, y: 0 },
    },
    {
        id: 'questionnaireNode-1',
        type: 'questionnaireNode',
        position: { x: 200, y: 0 },
        data: {
            selects: {
                'handle-0': 'screening',
            },
        },
    },
    {
        id: 'sendEmailTemplateNode-2',
        type: 'sendEmailTemplateNode',
        position: { x: 400, y: 80 },
        data: {
            selects: {
                'handle-0': 'rejectionEmail',
            },
        },
    },
    {
        id: 'rejectCandidateNode-3',
        type: 'rejectCandidateNode',
        position: { x: 600, y: 90 },
        data: {},
    },
];

const initialEdges: Edge[] = [
    {
        id: 'onReceiveCandidate-e1-0',
        source: 'onReceiveCandidate-0',
        target: 'questionnaireNode-1',
    },
    {
        id: 'questionnaireNode-e1-1',
        source: 'questionnaireNode-1',
        sourceHandle: 'questionnaireNode-1-output-2',
        target: 'sendEmailTemplateNode-2',
    },
    {
        id: 'sendEmailTemplateNode-2-e1-2',
        source: 'sendEmailTemplateNode-2',
        target: 'rejectCandidateNode-3',
    }
];

function WorkflowBuilderContainer(props: WorkflowBuilderContainerProps) {
    const [selectedSidebarTab, setSelectedSidebarTab] = useState('workflows');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSidebarTabClick: MenuProps['onClick'] = (e) => {
        setSelectedSidebarTab(e.key);
    };

    const handleWorkflowMenuItemClick = () => {

    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (title: string) => {
        console.log(title);
        console.log(title.replace(/\s+/g, '').toLowerCase());
        // const newWorkflow = new ReactFlowInstance();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const renderSidebarTab = () => {
        if (selectedSidebarTab === 'workflows') {
            return <WorkflowSelectMenu workflows={[]} />
        } else if (selectedSidebarTab === 'nodes') {
            return <NodeMenu />
        } else return <div />
    }

    return (
        <ReactFlowProvider>
            <Layout className='hwb-builder-container-layout'>
                <Sider theme='dark' >
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['workflows']}
                        items={sideMenuOptions}
                        mode='horizontal'
                        onClick={handleSidebarTabClick}
                        selectedKeys={[selectedSidebarTab]}
                        className='sidebar-menu'
                    />
                    {renderSidebarTab()}
                    <Button type='primary' onClick={() => showModal()}>Add workflow</Button>
                </Sider>
                <Layout>
                    <Content>
                        <WorkflowBuilder
                            nodes={initialNodes}
                            edges={initialEdges}
                        />
                        <NewWorkflowModal onOk={handleOk} onCancel={handleCancel} open={isModalOpen} />
                    </Content>
                </Layout>
            </Layout>
        </ReactFlowProvider>
    );
}

export default WorkflowBuilderContainer;