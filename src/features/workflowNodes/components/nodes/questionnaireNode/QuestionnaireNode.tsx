import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import NodeWrapper from '../../nodeWrapper/NodeWrapper';
import { Select } from 'antd';
import NodeSelectInput from '../../nodeSelectInput/NodeSelectInput';
import SingleConnectionHandle from '../../singleConnectionHandle/SingleConnectionHandle';

interface QuestionnaireNodeData {
    color: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selects: any;
}

interface QuestionnaireNodeProps extends NodeProps {
    data: QuestionnaireNodeData;
}

const questionnaireOptions = [
    { value: 'screening', label: 'Screening' },
    { value: 'basicDeveloper', label: 'Basic developer' },
    { value: 'advanceDeveloper', label: 'Advanced developer' },
]

const QuestionnaireNode: React.FC<QuestionnaireNodeProps> = memo(({ id, data, isConnectable }) => {

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
                <p>Send questionnaire:</p>
                {Object.keys(data.selects).map((handleId) => (
                    <NodeSelectInput options={questionnaireOptions} key={handleId} nodeId={id} value={data.selects[handleId]} handleId={handleId} />
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

export default QuestionnaireNode;
