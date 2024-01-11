import { useReactFlow, useStoreApi } from 'reactflow';
import './_nodeSelectInput.scss'

type NodeSelectInputProps = {
    value: string;
    handleId: string;
    nodeId: string;
    options: Option[];
}

type Option = {
    value: string;
    label: string;
}


function NodeSelectInput(props: NodeSelectInputProps) {
    const { setNodes } = useReactFlow();
    const store = useStoreApi();

    const onChange = (evt: any) => {
        const { nodeInternals } = store.getState();
        setNodes(
            Array.from(nodeInternals.values()).map((node) => {
                if (node.id === props.nodeId) {
                    node.data = {
                        ...node.data,
                        selects: {
                            ...node.data.selects,
                            [props.handleId]: evt.target.value,
                        },
                    };
                }

                return node;
            })
        );
    };

    return (
        <select className="node-select-input" onChange={onChange} value={props.value}>
            {props.options.map((option) => (
                <option key={option.value} value={option.value} className='option'>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default NodeSelectInput;