import { Flex } from 'antd';
import { NodeTypeEnum } from '../../types/types';
import './_nodeMenu.scss';

type NodeMenuItem = {
    name: string;
    input: number;
    output: number;
    type: NodeTypeEnum;
    style: 'default' | 'failure' | 'success';
}

const nodeOptions: NodeMenuItem[] = [
    {
        name: 'On receive candidate',
        input: 0,
        output: 1,
        type: NodeTypeEnum.OnReceiveCandidate,
        style: 'success',
    },
    {
        name: 'Send e-mail template',
        input: 1,
        output: 1,
        type: NodeTypeEnum.SendMailTemplate,
        style: 'default',
    },
    {
        name: 'Send questionnaire',
        input: 1,
        output: 2,
        type: NodeTypeEnum.Questionnaire,
        style: 'default',
    },
    {
        name: 'Schedule interview',
        input: 1,
        output: 2,
        type: NodeTypeEnum.Interview,
        style: 'default',
    },
    {
        name: 'Accept Candidate',
        input: 1,
        output: 0,
        type: NodeTypeEnum.AcceptCandidate,
        style: 'success',
    },
    {
        name: 'Reject candidate',
        input: 1,
        output: 0,
        type: NodeTypeEnum.RejectCandidate,
        style: 'failure',
    },
    {
        name: 'Add to pool',
        input: 1,
        output: 0,
        type: NodeTypeEnum.AddToPool,
        style: 'success',
    },
]

function NodeMenu() {
    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const renderConnectionPins = (num: number) => {
        return [...Array(num)].map((e, i) => <div className='node-pin' />)
    }

    const Node = (node: NodeMenuItem) => (
        <div className={`node-item ${node.style}`} onDragStart={(event) => onDragStart(event, node.type)} draggable>
            <div className='inputs'>
                {node.input ? renderConnectionPins(node.input) : <div />}
            </div>
            <div className='outputs'>
                {node.output ? renderConnectionPins(node.output) : <div />}
            </div>
            {node.name}
        </div >)


    return (
        <Flex vertical gap={16} className='node-menu'>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            {nodeOptions.map((node) => Node(node))}
        </Flex>
    );
};

export default NodeMenu;