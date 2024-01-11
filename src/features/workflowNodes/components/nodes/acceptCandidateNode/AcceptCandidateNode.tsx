import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import NodeWrapper from '@/features/workflowNodes/components/nodeWrapper/NodeWrapper';

interface AcceptCandidateNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface AcceptCandidateNodeProps extends NodeProps {
    data: AcceptCandidateNodeData;
}

const AcceptCandidateNode: React.FC<AcceptCandidateNodeProps> = memo(({ id, data, isConnectable }) => {

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
            <NodeWrapper type='success'>
                <p>Accept candidate</p>
            </NodeWrapper>
        </>
    );
});

export default AcceptCandidateNode;
