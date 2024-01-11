import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    useNodesState, useEdgesState, addEdge, Node, Edge, Position, OnConnect, Background, ReactFlowInstance, BackgroundVariant
} from 'reactflow';
import './_workflowBuilder.scss';
import QuestionnaireNode from '@/features/workflowNodes/components/nodes/questionnaireNode/QuestionnaireNode';
import AcceptCandidateNode from '@/features/workflowNodes/components/nodes/acceptCandidateNode/AcceptCandidateNode';
import { generateCustomNode } from '@/features/workflowBuilder/utils/generateCustomNode';
import RejectCandidateNode from '@/features/workflowNodes/components/nodes/rejectCandidateNode/RejectCandidateNode';
import AddToPoolNode from '@/features/workflowNodes/components/nodes/addToPoolNode/AddToPoolNode';
import OnReceiveCandidateNode from '@/features/workflowNodes/components/nodes/onReceiveCandidateNode/OnReceiveCandidateNode';

const defaultEdgeOptions = {
    type: 'smoothstep',
    animated: true,
}

type WorkflowBuilderProps = {
    nodes: Node[];
    edges: Edge[];
}

const nodeTypes = {
    questionnaireNode: QuestionnaireNode,
    acceptCandidateNode: AcceptCandidateNode,
    rejectCandidateNode: RejectCandidateNode,
    addToPoolNode: AddToPoolNode,
    onReceiveCandidateNode: OnReceiveCandidateNode,
};

const WorkflowBuilder = (props: WorkflowBuilderProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
    const [idIncrement, setIdIncrement] = useState(0);

    useEffect(() => {
        const id: any = nodes.slice(-1)[0].id;
        const idNumber = parseInt(id.slice(id.indexOf('-') + 1));
        setIdIncrement(idNumber + 1);
        console.log(nodes.slice(-1)[0].id);
        console.log(idNumber + 1)
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
            console.log('setting node of type ' + type + 'with id ' + idIncrement);
            let newNode: Node = generateCustomNode(type, position, idIncrement);
            // setIdIncrement(idIncrement + 1);
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes, idIncrement]
    );

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
            </ReactFlow>
        </div>
    );
};

export default WorkflowBuilder;
