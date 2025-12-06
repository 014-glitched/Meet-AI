import { ResponsiveDialog } from '@/src/components/responsive-dialog';
import AgentsForm from './agents-form';

interface AgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void
}

const AgentsDialog = ({ open, onOpenChange }: AgentDialogProps) => {
  return (
    <ResponsiveDialog title='New Agent'
        description='Create a new Agent'
        open={open}
        onOpenChange={onOpenChange}
    >
      <AgentsForm 
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

export default AgentsDialog