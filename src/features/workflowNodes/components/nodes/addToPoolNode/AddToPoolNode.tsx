import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import NodeWrapper from '@/features/workflowNodes/components/nodeWrapper/NodeWrapper';

interface AddToPoolNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface AddToPoolNodeProps extends NodeProps {
    data: AddToPoolNodeData;
}

const AddToPoolNode: React.FC<AddToPoolNodeProps> = memo(({ id, data, isConnectable }) => {

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
            <NodeWrapper type='success'>
                <p>Add to accepted candidates pool</p>
            </NodeWrapper>
        </>
    );
});

export default AddToPoolNode;
