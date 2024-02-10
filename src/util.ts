export const transformWorkflowNameToKey = (workflowName: string) => {
    const key = `workflow_${workflowName.replace(/\s+/g, '-').toLowerCase()}`;
    return key;
};


export const transformKeyToWorkflowName = (key: string) => {
    let name = key.replace(/^workflow_/, '').replace(/-/g, ' ');
    // Optional: Transform to title case or another preferred format here
    return name;
};


export const truncateString = (str: string, num: number) => {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}