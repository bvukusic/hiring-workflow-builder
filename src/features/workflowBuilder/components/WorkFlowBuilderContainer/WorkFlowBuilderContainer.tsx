import { Layout, Menu, MenuProps, Typography, message } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import WorkflowBuilder from '@/features/workflowBuilder/components/workflowBuilder/WorkflowBuilder';
import { ReactFlowProvider } from 'reactflow';
import NodeMenu from '@/features/workflowNodes/components/nodeMenu/NodeMenu';
import WorkflowSelectMenu from '@/features/workflowBuilder/components/workflowSelectMenu/WorkflowSelectMenu';
import NewWorkflowModal from '@/features/workflowBuilder/components/newWorkflowModal/NewWorkflowModal';
import { exampleWorkflowObject, starterWorkflowObject } from '@/features/workflowBuilder/utils/types';
import { transformKeyToWorkflowName, transformWorkflowNameToKey } from '@/util';
import './_workflowBuilderContainer.scss';

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

function WorkflowBuilderContainer(props: WorkflowBuilderContainerProps) {
    const [selectedSidebarTab, setSelectedSidebarTab] = useState('workflows');
    const [currentWorkflow, setCurrentWorkflow] = useState<any>(null);
    const [currentWorkflowName, setCurrentWorkflowName] = useState('Workflow 2');
    const [savedWorkflows, setSavedWorkflows] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSidebarTabClick: MenuProps['onClick'] = (e) => {
        setSelectedSidebarTab(e.key);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (title: string) => {
        handleCreateNewWorkflow(title);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getSavedWorkflows();
        //generate example workflow if none are saved
        if (savedWorkflows.length === 0) {
            saveWorkflow(exampleWorkflowObject, 'Example Workflow');
            setCurrentWorkflowName('Example Workflow');
            setCurrentWorkflow(exampleWorkflowObject);
        }
    }, [])

    const renderSidebarTab = () => {
        if (selectedSidebarTab === 'workflows') {
            return <WorkflowSelectMenu
                workflows={savedWorkflows}
                onClickNewWorkflow={() => showModal()}
                onSelectWorkflow={handleSelectWorkflow}
                currentWorkflowName={currentWorkflowName}
                onDelete={deleteWorkflow}
            />
        } else if (selectedSidebarTab === 'nodes') {
            return <NodeMenu />
        } else return <div />
    }

    const saveWorkflow = (workflowData: any, workflowName: string) => {
        const workflowKey = transformWorkflowNameToKey(workflowName);
        localStorage.setItem(workflowKey, JSON.stringify(workflowData));
        message.success(`Saved workflow: ${workflowName}!`);
        getSavedWorkflows();
    };


    const loadWorkflow = (workflowName: string) => {
        const workflowKey = transformWorkflowNameToKey(workflowName);
        const workflowData = localStorage.getItem(workflowKey);
        return workflowData ? JSON.parse(workflowData) : null;
    };

    const deleteWorkflow = (workflowName: string) => {
        const key = transformWorkflowNameToKey(workflowName);
        localStorage.removeItem(key);
        getSavedWorkflows();
        setCurrentWorkflow(null);
    };

    const handleSelectWorkflow = (workflowName: string) => {
        const loadedWorkflow = loadWorkflow(workflowName);
        if (loadedWorkflow) {
            setCurrentWorkflow(loadedWorkflow);
            setCurrentWorkflowName(workflowName);
        }
    };

    const handleCreateNewWorkflow = (workflowName: string) => {
        const initialWorkflowData = starterWorkflowObject;
        saveWorkflow(initialWorkflowData, workflowName);
        setCurrentWorkflow(initialWorkflowData);
        setCurrentWorkflowName(workflowName);
    };

    const getSavedWorkflows = () => {
        const workflows = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('workflow_')) {
                const name = transformKeyToWorkflowName(key);
                workflows.push(name);
            }
        }
        setSavedWorkflows(workflows);
    }

    return (
        <ReactFlowProvider>
            <Layout className='hwb-builder-container-layout'>
                <Sider theme='dark' width={250}>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['workflows']}
                        items={sideMenuOptions}
                        mode='horizontal'
                        onClick={handleSidebarTabClick}
                        selectedKeys={[selectedSidebarTab]}
                    />
                    {renderSidebarTab()}
                </Sider>
                <Layout>
                    <Content>
                        {currentWorkflow ?
                            <WorkflowBuilder
                                nodes={currentWorkflow.nodes}
                                edges={currentWorkflow.edges}
                                workflowName={currentWorkflowName}
                                onLoadWorkflow={loadWorkflow}
                                onSaveWorkflow={saveWorkflow}
                            /> :
                            <div className='no-workflow-selected'>
                                <Typography.Text>Select a workflow to get started</Typography.Text>
                            </div>
                        }
                        <NewWorkflowModal onOk={handleOk} onCancel={handleCancel} open={isModalOpen} />
                    </Content>
                </Layout>
            </Layout>
        </ReactFlowProvider>
    );
}

export default WorkflowBuilderContainer;