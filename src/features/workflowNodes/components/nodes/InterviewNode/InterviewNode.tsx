import React, { memo } from 'react';
import { Position, NodeProps } from 'reactflow';
import NodeWrapper from '../../nodeWrapper/NodeWrapper';
import NodeSelectInput from '../../nodeSelectInput/NodeSelectInput';
import SingleConnectionHandle from '../../singleConnectionHandle/SingleConnectionHandle';

interface InterviewNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface InterviewNodeProps extends NodeProps {
    data: InterviewNodeData;
}

const interviewOptions = [
    { value: 'screening', label: 'Screening' },
    { value: 'hr_interview', label: 'HR interview' },
    { value: 'tech_interview', label: 'Tech interview' },
    { value: 'management_interview', label: 'Management interview' },
]

const InterviewNode: React.FC<InterviewNodeProps> = memo(({ id, data, isConnectable }) => {

    return (
        <>
            <SingleConnectionHandle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                isConnectable={isConnectable}
                id={`${id}-input`}
                connectionLimit={1}
            />
            <NodeWrapper>
                <p>Schedule interview:</p>
                {Object.keys(data.selects).map((handleId) => (
                    <NodeSelectInput options={interviewOptions} key={handleId} nodeId={id} value={data.selects[handleId]} handleId={handleId} />
                ))}
            </NodeWrapper>
            <SingleConnectionHandle
                type="source"
                position={Position.Right}
                id={`${id}-output-1`}
                connectionLimit={1}
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
                label='succeeded'
            />
            <SingleConnectionHandle
                type="source"
                position={Position.Right}
                id={`${id}-output-2`}
                connectionLimit={1}
                isConnectable={isConnectable}
                style={{ bottom: 10, top: 'auto', background: '#555' }}
                label='failed'
            />

        </>
    );
});

export default InterviewNode;
