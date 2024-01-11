import { Flex } from 'antd';
import { ReactNode } from 'react';
import './_nodeWrapper.scss';

type NodeWrapperProps = {
    children: ReactNode;
    type?: 'success' | 'failure' | 'default';
}
function NodeWrapper(props: NodeWrapperProps) {
    return (
        <Flex justify='center' align='start'>
            <div className={`node-wrapper ${props.type}`}>
                {props.children}

            </div>
        </Flex>
    );
}

export default NodeWrapper;