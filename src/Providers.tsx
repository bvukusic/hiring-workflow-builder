import AppLayout from '@/features/layout/AppLayout'
import WorkflowBuilderContainer from '@/features/workflowBuilder/components/WorkFlowBuilderContainer/WorkFlowBuilderContainer'

function Providers() {

  return (
    <>
      <AppLayout>
        <WorkflowBuilderContainer />
      </AppLayout>
    </>
  )
}

export default Providers
