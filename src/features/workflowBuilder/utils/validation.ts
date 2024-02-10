import { Edge, Node } from 'reactflow';

export const validateWorkflow = (nodes: Node[], edges: Edge[]) => {
    const errors = [];

    const requiredNodeTypes: string[] = ['onReceiveCandidateNode', 'acceptCandidateNode', 'rejectCandidateNode', 'addToPoolNode'];
    const nodeTypeCounts: Record<string, number> = {
        onReceiveCandidate: 0,
        acceptCandidate: 0,
        rejectCandidate: 0,
        addToPool: 0
    };

    nodes.forEach((node) => {
        if (node.type && nodeTypeCounts.hasOwnProperty(node.type)) {
            nodeTypeCounts[node.type] += 1;
        }
    });

    requiredNodeTypes.forEach((type) => {
        if (nodeTypeCounts[type] === 0) {
            errors.push(`Missing node of type: ${type}`);
        }
    });

    const unconnectedNodes = nodes.filter((node) => {
        const connectedEdges = edges.filter(
            (edge) => edge.source === node.id || edge.target === node.id
        );
        return connectedEdges.length === 0;
    });

    if (unconnectedNodes.length > 0) {
        errors.push('There are unconnected nodes in the workflow.');
    }

    return errors;
};