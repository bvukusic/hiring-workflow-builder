import { transformWorkflowNameToKey } from '@/util';
import { Flex, Input, Modal, Typography, Button, message } from 'antd';
import { useState } from 'react';

type NewWorkflowModalProps = {
    open: boolean;
    onOk: (title: string) => void;
    onCancel: () => void;
}

function NewWorkflowModal(props: NewWorkflowModalProps) {
    const [title, setTitle] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validTitleRegex = /^[a-zA-Z0-9 ]*$/;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (validTitleRegex.test(input)) {
            setTitle(input);
            setIsValid(true);
        } else {
            setIsValid(false);
            message.error('Invalid characters: Only letters, numbers, and spaces are allowed.');
        }
    };

    const handleCreateWorkflow = () => {
        if (!isValid || !title.trim()) {
            message.error('Please enter a valid name for the workflow.');
            return;
        }
        const workflowKey = transformWorkflowNameToKey(title);

        if (localStorage.getItem(workflowKey)) {
            alert('A workflow with this name already exists. Please choose a different name.');
            return;
        }

        props.onOk(title.trim());
    };

    return (
        <Modal
            title="New Workflow"
            open={props.open}
            onOk={handleCreateWorkflow}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" disabled={!isValid || !title.trim()} onClick={handleCreateWorkflow}>
                    Create
                </Button>,
            ]}
        >
            <Flex align='left' justify='center' vertical>
                <Typography.Title level={4}>Name your workflow:</Typography.Title>
                <Input
                    size="large"
                    placeholder="Workflow name"
                    value={title}
                    onChange={handleInputChange}
                    status={!isValid ? 'error' : ''}
                />
            </Flex>
        </Modal>
    );
}

export default NewWorkflowModal;
