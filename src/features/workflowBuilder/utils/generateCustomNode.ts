import { NodeTypeEnum } from '@/features/workflowNodes/types/types';
import { Node, Position, XYPosition } from 'reactflow';

export function generateCustomNode(type: string, position: XYPosition, idIncrement: number) {
    let newNode: Node;

    switch (type) {
        case NodeTypeEnum.Questionnaire:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'questionnaireNode',
                position,
                data: {
                    selects: {
                        'handle-0': 'screening',
                    },
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            };
            break;
        case NodeTypeEnum.AcceptCandidate:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'acceptCandidateNode',
                position,
                data: {},
                sourcePosition: Position.Right,
            };
            break;
        case NodeTypeEnum.RejectCandidate:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'rejectCandidateNode',
                position,
                data: {},
                sourcePosition: Position.Right,
            };
            break;
        case NodeTypeEnum.AddToPool:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'addToPoolNode',
                position,
                data: {},
                sourcePosition: Position.Right,
            };
            break;
        case NodeTypeEnum.Branch:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'branchNode',
                position,
                data: {},
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            };
            break;
        case NodeTypeEnum.SendMailTemplate:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'sendEmailTemplateNode',
                position,
                data: {
                    selects: {
                        'handle-0': 'rejectionEmail',
                    },
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            };
            break;
        case NodeTypeEnum.OnReceiveCandidate:
            newNode = {
                id: `${type}-${idIncrement}`,
                type: 'onReceiveCandidateNode',
                position,
                data: {},
                targetPosition: Position.Left,
            };
            break;
        default:
            newNode = {
                id: `${type}-${idIncrement}`,
                type,
                position,
                data: { label: `${type}` },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            };
            break;
    }

    return newNode;
}