import { Flex, Input, Modal, Typography } from 'antd';
import { useState } from 'react';

type NewWorkflowModalProps = {
    open: boolean;
    onOk: (title: string) => void;
    onCancel: () => void;
}

function NewWorkflowModal(props: NewWorkflowModalProps) {
    const [title, setTitle] = useState('');

    const handleCreateWorkflow = () => {
        props.onOk(title);
    }

    return (
        <Modal title="New workflow" open={props.open} onOk={handleCreateWorkflow} onCancel={props.onCancel}>
            <Flex align='left' justify='center' vertical>
                <Typography.Title level={4}>Name your workflow:</Typography.Title>
                <Input size="large" placeholder="large size" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Flex>
        </Modal>
    );
}

export default NewWorkflowModal;