import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    useNodesState, useEdgesState, addEdge, Node, Edge, OnConnect, Background, ReactFlowInstance, BackgroundVariant, Panel, useReactFlow
} from 'reactflow';
import { generateCustomNode } from '@/features/workflowBuilder/utils/generateCustomNode';
import { defaultEdgeOptions, nodeTypes } from '@/features/workflowBuilder/utils/utils';
import { Button, Typography } from 'antd';
import ErrorBox from '../errorBox/ErrorBox';
import { validateWorkflow } from '../../utils/validation';
import './_workflowBuilder.scss';
import HelpBox from '../helpBox/HelpBox';

type WorkflowBuilderProps = {
    nodes: Node[];
    edges: Edge[];
    onSaveWorkflow: (workflowData: any, workflowName: string) => void;
    onLoadWorkflow: (workflowName: string) => any;
    workflowName: string;
}

const WorkflowBuilder = (props: WorkflowBuilderProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
    const [idIncrement, setIdIncrement] = useState(0);
    const [workflowErrors, setWorkflowErrors] = useState<string[]>([]);

    useEffect(() => {
        const id: any = nodes.slice(-1)[0]?.id;
        const idNumber = id ? parseInt(id.slice(id.indexOf('-') + 1)) : -1;
        setIdIncrement(idNumber + 1);
    }, [nodes])

    useEffect(() => {
        const errors = validateWorkflow(nodes, edges);
        setWorkflowErrors(errors);
    }, [nodes, edges])

    useEffect(() => {
        setNodes(props.nodes)
        setEdges(props.edges)
    }, [props.nodes])

    const onConnect: OnConnect = useCallback((params) => {
        setEdges((els) => addEdge(params, els));
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type || !reactFlowInstance) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - 350,
                y: event.clientY,
            });
            let newNode: Node = generateCustomNode(type, position, idIncrement);
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes, idIncrement]
    );

    const onSave = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            props.onSaveWorkflow(flow, props.workflowName);
        }
    };

    return (
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                defaultEdgeOptions={defaultEdgeOptions}
                onConnect={onConnect}
                fitView
                attributionPosition="bottom-left"
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <Background
                    className='workflow-background'
                    variant={BackgroundVariant.Lines}
                    lineWidth={0.2}
                />
                <Panel position="top-left">
                    <Typography.Text className='workflow-title'>{props.workflowName}</Typography.Text>
                </Panel>
                <Panel position="top-right">
                    <Button type='primary' className='save-button' onClick={onSave}>Save</Button>
                </Panel>
                <Panel position="bottom-right">
                    <ErrorBox errors={workflowErrors} />
                </Panel>
                <Panel position="bottom-left">
                    <HelpBox />
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default WorkflowBuilder;
