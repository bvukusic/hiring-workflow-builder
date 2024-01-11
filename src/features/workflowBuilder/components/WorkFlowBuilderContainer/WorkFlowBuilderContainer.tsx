import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useCallback, useState } from 'react';
import WorkflowBuilder from '@/features/workflowBuilder/components/workflowBuilder/WorkflowBuilder';
import { Edge, EdgeChange, Node, NodeChange, OnConnect, Position, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from 'reactflow';
import './_workflowBuilderContainer.scss';
import NodeMenu from '@/features/workflowNodes/components/nodeMenu/NodeMenu';
import WorkflowSelectMenu from '../workflowSelectMenu/WorkflowSelectMenu';

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
];

const initialEdges: Edge[] = [
    {
        id: 'onReceiveCandidate-e1-2',
        source: 'onReceiveCandidate-0',
        target: 'questionnaireNode-1',
    },
];

function WorkflowBuilderContainer(props: WorkflowBuilderContainerProps) {
    const [selectedSidebarTab, setSelectedSidebarTab] = useState('workflows');

    const onSidebarTabClick: MenuProps['onClick'] = (e) => {
        setSelectedSidebarTab(e.key);
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
                        onClick={onSidebarTabClick}
                        selectedKeys={[selectedSidebarTab]}
                        className='sidebar-menu'
                    />
                    {renderSidebarTab()}
                </Sider>
                <Layout>
                    <Content>
                        <WorkflowBuilder
                            nodes={initialNodes}
                            edges={initialEdges}
                        />
                    </Content>
                </Layout>
            </Layout>
        </ReactFlowProvider>
    );
}

export default WorkflowBuilderContainer;