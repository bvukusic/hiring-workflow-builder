import React, { memo } from 'react';
import { Position, NodeProps } from 'reactflow';
import NodeWrapper from '@/features/workflowNodes/components/nodeWrapper/NodeWrapper';
import SingleConnectionHandle from '../../singleConnectionHandle/SingleConnectionHandle';

interface OnReceiveCandidateNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface OnReceiveCandidateNodeProps extends NodeProps {
    data: OnReceiveCandidateNodeData;
}

const OnReceiveCandidateNode: React.FC<OnReceiveCandidateNodeProps> = memo(({ id, data, isConnectable }) => {

    return (
        <>
            <NodeWrapper type='success'>
                <p>On receive candidate</p>
            </NodeWrapper>
            <SingleConnectionHandle
                id={`${id}-output`}
                type="source"
                position={Position.Right}
                connectionLimit={1}
                isConnectable={isConnectable}
            />
        </>
    );
});

export default OnReceiveCandidateNode;
