import InterviewNode from '@/features/workflowNodes/components/nodes/InterviewNode/InterviewNode';
import AcceptCandidateNode from '@/features/workflowNodes/components/nodes/acceptCandidateNode/AcceptCandidateNode';
import AddToPoolNode from '@/features/workflowNodes/components/nodes/addToPoolNode/AddToPoolNode';
import OnReceiveCandidateNode from '@/features/workflowNodes/components/nodes/onReceiveCandidateNode/OnReceiveCandidateNode';
import QuestionnaireNode from '@/features/workflowNodes/components/nodes/questionnaireNode/QuestionnaireNode';
import RejectCandidateNode from '@/features/workflowNodes/components/nodes/rejectCandidateNode/RejectCandidateNode';
import SendEmailTemplateNode from '@/features/workflowNodes/components/nodes/sendEmailTemplateNode/SendEmailTemplateNode';

export const defaultEdgeOptions = {
    type: 'smoothstep',
    animated: true,
}

export const nodeTypes = {
    questionnaireNode: QuestionnaireNode,
    interviewNode: InterviewNode,
    acceptCandidateNode: AcceptCandidateNode,
    rejectCandidateNode: RejectCandidateNode,
    addToPoolNode: AddToPoolNode,
    onReceiveCandidateNode: OnReceiveCandidateNode,
    sendEmailTemplateNode: SendEmailTemplateNode,
};