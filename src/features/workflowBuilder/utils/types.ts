import { Position, ReactFlowJsonObject } from 'reactflow';

export type SavedWorkflowType = {
    name: string;
    key: string;
    workflow: Object[];
}

export const starterWorkflowObject: ReactFlowJsonObject = {
    nodes: [{
        id: 'onReceiveCandidate-0',
        sourcePosition: Position.Right,
        type: 'onReceiveCandidateNode',
        data: {},
        position: { x: 0, y: 0 },
    },
    {
        id: 'acceptCandidateNode-1',
        type: 'acceptCandidateNode',
        position: { x: 400, y: -80 },
        data: {},
    },
    {
        id: 'rejectCandidateNode-2',
        type: 'rejectCandidateNode',
        position: { x: 400, y: 80 },
        data: {},
    }],
    edges: [],
    viewport: {
        x: 0,
        y: 0,
        zoom: 5
    }
}