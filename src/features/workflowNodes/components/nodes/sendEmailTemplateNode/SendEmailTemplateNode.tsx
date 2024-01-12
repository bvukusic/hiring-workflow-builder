import React, { memo } from 'react';
import { Position, NodeProps } from 'reactflow';
import NodeWrapper from '../../nodeWrapper/NodeWrapper';
import NodeSelectInput from '../../nodeSelectInput/NodeSelectInput';
import SingleConnectionHandle from '../../singleConnectionHandle/SingleConnectionHandle';

interface SendEmailTemplateNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface SendEmailTemplateNodeProps extends NodeProps {
    data: SendEmailTemplateNodeData;
}

const questionnaireOptions = [
    { value: 'startEmail', label: 'Start interviewing proccess' },
    { value: 'moveToNextPhase', label: 'Advance to next phase' },
    { value: 'rejectionEmail', label: 'Rejection e-mail' },
    { value: 'acceptanceEmail', label: 'Acceptance e-mail' },
]

const SendEmailTemplateNode: React.FC<SendEmailTemplateNodeProps> = memo(({ id, data, isConnectable }) => {

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
                <p>Send e-mail template:</p>
                {Object.keys(data.selects).map((handleId) => (
                    <NodeSelectInput options={questionnaireOptions} key={handleId} nodeId={id} value={data.selects[handleId]} handleId={handleId} />
                ))}
            </NodeWrapper>
            <SingleConnectionHandle
                type="source"
                position={Position.Right}
                id={`${id}-output-1`}
                connectionLimit={1}
                isConnectable={isConnectable}
            />
        </>
    );
});

export default SendEmailTemplateNode;
