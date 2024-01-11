import { Tag } from 'antd';
import { useMemo } from 'react';
import { Handle, Node, Edge, useStore, useNodeId, HandleProps, getConnectedEdges } from 'reactflow';
import './_singleConnectionHandle.scss';

type StoreSelector = {
    nodeInternals: Map<string, Node>;
    edges: Edge[];
};

type SingleConnectionHandleOwnProps = {
    connectionLimit: number;
    style?: Object;
    label?: string;
    id: string;
}

type SingleConnectionHandleProps = SingleConnectionHandleOwnProps & HandleProps;

const SingleConnectionHandle = (props: SingleConnectionHandleProps) => {
    const selector = (s: StoreSelector) => ({
        nodeInternals: s.nodeInternals,
        edges: s.edges,
    });

    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    if (nodeId === null) {
        return false;
    }

    const isHandleConnectable = useMemo(() => {
        const node = nodeInternals.get(nodeId);
        if (node === undefined) return false;
        const connectedEdges = getConnectedEdges([node], edges);
        let connectedToHandle = 0;
        connectedEdges.forEach(edge => {
            if (edge.sourceHandle === props.id || edge.targetHandle === props.id) {
                connectedToHandle++;
            }
        });
        return connectedToHandle < props.connectionLimit;
    }, [nodeInternals, edges, nodeId, props.isConnectable]);

    return (
        <div className='single-connection-handle'>
            <Handle {...props} style={props.style} id={props.id} isConnectable={isHandleConnectable}>
                {props.label && <Tag className='handle-label'>{props.label}</Tag>}
            </Handle>
        </div>
    );
};

export default SingleConnectionHandle;
