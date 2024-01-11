import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import NodeWrapper from '@/features/workflowNodes/components/nodeWrapper/NodeWrapper';

interface RejectCandidateNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface RejectCandidateNodeProps extends NodeProps {
    data: RejectCandidateNodeData;
}

const RejectCandidateNode: React.FC<RejectCandidateNodeProps> = memo(({ id, data, isConnectable }) => {

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
            <NodeWrapper type='failure'>
                <p>Reject candidate</p>
            </NodeWrapper>
        </>
    );
});

export default RejectCandidateNode;
