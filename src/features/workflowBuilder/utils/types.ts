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

export const exampleWorkflowObject: ReactFlowJsonObject = {
    nodes: [
        {
            "width": 102,
            "height": 43,
            "id": "onReceiveCandidate-0",
            "sourcePosition": Position.Right,
            "type": "onReceiveCandidateNode",
            "data": {},
            "position": {
                "x": -81,
                "y": -2.5
            },
            "selected": false,
            "positionAbsolute": {
                "x": -81,
                "y": -2.5
            },
            "dragging": false
        },
        {
            "width": 87,
            "height": 43,
            "id": "acceptCandidateNode-1",
            "type": "acceptCandidateNode",
            "position": {
                "x": 506.17186648501354,
                "y": -137.48950953678474
            },
            "data": {},
            "selected": true,
            "positionAbsolute": {
                "x": 506.17186648501354,
                "y": -137.48950953678474
            },
            "dragging": false
        },
        {
            "width": 84,
            "height": 43,
            "id": "rejectCandidateNode-2",
            "type": "rejectCandidateNode",
            "position": {
                "x": 254,
                "y": 112
            },
            "data": {},
            "selected": false,
            "positionAbsolute": {
                "x": 254,
                "y": 112
            },
            "dragging": false
        },
        {
            "width": 105,
            "height": 66,
            "id": "questionnaire-3",
            "type": "questionnaireNode",
            "position": {
                "x": 102,
                "y": -14.25
            },
            "data": {
                "selects": {
                    "handle-0": "screening"
                }
            },
            "sourcePosition": Position.Right,
            "targetPosition": Position.Left,
            "selected": false,
            "positionAbsolute": {
                "x": 102,
                "y": -14.25
            },
            "dragging": false
        },
        {
            "width": 84,
            "height": 43,
            "id": "rejectCandidate-5",
            "type": "rejectCandidateNode",
            "position": {
                "x": 540.5,
                "y": 115.75
            },
            "data": {},
            "sourcePosition": Position.Right,
            "positionAbsolute": {
                "x": 540.5,
                "y": 115.75
            }
        },
        {
            "width": 113,
            "height": 66,
            "id": "interview-6",
            "type": "interviewNode",
            "position": {
                "x": 274.9218664850136,
                "y": -127.08162465940056
            },
            "data": {
                "selects": {
                    "handle-0": "tech_interview"
                }
            },
            "sourcePosition": Position.Right,
            "targetPosition": Position.Left,
            "selected": false,
            "positionAbsolute": {
                "x": 274.9218664850136,
                "y": -127.08162465940056
            },
            "dragging": false
        }
    ],
    edges: [
        {
            "type": "smoothstep",
            "animated": true,
            "source": "onReceiveCandidate-0",
            "sourceHandle": "onReceiveCandidate-0-output",
            "target": "questionnaire-3",
            "targetHandle": "questionnaire-3-input",
            "id": "reactflow__edge-onReceiveCandidate-0onReceiveCandidate-0-output-questionnaire-3questionnaire-3-input"
        },
        {
            "type": "smoothstep",
            "animated": true,
            "source": "questionnaire-3",
            "sourceHandle": "questionnaire-3-output-2",
            "target": "rejectCandidateNode-2",
            "targetHandle": null,
            "id": "reactflow__edge-questionnaire-3questionnaire-3-output-2-rejectCandidateNode-2"
        },
        {
            "type": "smoothstep",
            "animated": true,
            "source": "questionnaire-3",
            "sourceHandle": "questionnaire-3-output-1",
            "target": "interview-6",
            "targetHandle": "interview-6-input",
            "id": "reactflow__edge-questionnaire-3questionnaire-3-output-1-interview-6interview-6-input"
        },
        {
            "type": "smoothstep",
            "animated": true,
            "source": "interview-6",
            "sourceHandle": "interview-6-output-1",
            "target": "acceptCandidateNode-1",
            "targetHandle": null,
            "id": "reactflow__edge-interview-6interview-6-output-1-acceptCandidateNode-1"
        },
        {
            "type": "smoothstep",
            "animated": true,
            "source": "interview-6",
            "sourceHandle": "interview-6-output-2",
            "target": "rejectCandidate-5",
            "targetHandle": null,
            "id": "reactflow__edge-interview-6interview-6-output-2-rejectCandidate-5"
        }
    ],
    viewport: {
        x: 0,
        y: 0,
        zoom: 5
    }
}