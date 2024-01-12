import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    useNodesState, useEdgesState, addEdge, Node, Edge, OnConnect, Background, ReactFlowInstance, BackgroundVariant, Panel, useReactFlow
} from 'reactflow';
import './_workflowBuilder.scss';
import { generateCustomNode } from '@/features/workflowBuilder/utils/generateCustomNode';
import { defaultEdgeOptions, nodeTypes } from '@/features/workflowBuilder/utils/utils';

type WorkflowBuilderProps = {
    nodes: Node[];
    edges: Edge[];
}

const WorkflowBuilder = (props: WorkflowBuilderProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const { setViewport } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
    const [idIncrement, setIdIncrement] = useState(0);

    useEffect(() => {
        console.log(edges)
    }, [edges])

    useEffect(() => {
        const id: any = nodes.slice(-1)[0].id;
        const idNumber = parseInt(id.slice(id.indexOf('-') + 1));
        setIdIncrement(idNumber + 1);
    }, [props.nodes, nodes])

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

    const onSave = useCallback(() => {
        // if (reactFlowInstance) {
        //     const flow = reactFlowInstance.toObject();
        //     localStorage.setItem(flowKey, JSON.stringify(flow));
        // }
    }, [reactFlowInstance]);

    const onRestore = useCallback(() => {
        // const restoreFlow = async () => {
        //     const flow = JSON.parse(localStorage.getItem(flowKey));

        //     if (flow) {
        //         const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        //         setNodes(flow.nodes || []);
        //         setEdges(flow.edges || []);
        //         setViewport({ x, y, zoom });
        //     }
        // };

        // restoreFlow();
    }, [setNodes, setViewport]);

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
                <Panel position="top-right">
                    <button onClick={onSave}>save</button>
                    <button onClick={onRestore}>restore</button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default WorkflowBuilder;
