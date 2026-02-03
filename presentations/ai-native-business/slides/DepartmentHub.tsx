/**
 * AI-Native Business Department Hub
 *
 * The canonical 11-department orbital diagram showing the Agent Command Center
 * orchestrating all business functions.
 *
 * Copy this to your presentation's slides/ folder and customize as needed.
 */

import { CircularHub, HubNode, HubConnection } from '@catalog/templates/CircularHub'

const departments: HubNode[] = [
  // Right Quadrant (Ops & Risk)
  { id: 'ops', label: 'Operations', status: 'operational', icon: 'Server', angle: 15, progress: 96 },
  { id: 'sec', label: 'Security', status: 'progress', icon: 'Shield', angle: 55, progress: 45 },
  { id: 'data', label: 'Business Intel', status: 'planned', icon: 'BarChart3', angle: 90, progress: 5 },

  // Bottom Right (Admin)
  { id: 'fin', label: 'Finance', status: 'operational', icon: 'DollarSign', angle: 125, progress: 100 },
  { id: 'legal', label: 'Legal', status: 'progress', icon: 'Scale', angle: 155, progress: 60 },

  // Bottom Left (Customer Support/Mkt)
  { id: 'sup', label: 'Support', status: 'planned', icon: 'Headphones', angle: 195, progress: 12 },
  { id: 'mkt', label: 'Marketing', status: 'planned', icon: 'PenTool', angle: 225, progress: 8 },

  // Top Left (GTM & Product)
  { id: 'sales', label: 'Sales', status: 'progress', icon: 'Globe', angle: 260, progress: 75 },
  { id: 'crm', label: 'CRM', status: 'operational', icon: 'Database', angle: 295, progress: 92 },

  // Top (Build)
  { id: 'prod', label: 'Product', status: 'progress', icon: 'Box', angle: 325, progress: 35 },
  { id: 'dev', label: 'Software Dev', status: 'progress', icon: 'Code', angle: 350, progress: 55 },
]

const connections: HubConnection[] = [
  { from: 'sales', to: 'mkt' },
  { from: 'dev', to: 'ops' },
  { from: 'ops', to: 'sec' },
  { from: 'fin', to: 'legal' },
  { from: 'sales', to: 'crm' },
  { from: 'sup', to: 'sales' },
  { from: 'prod', to: 'dev' },
  { from: 'data', to: 'fin' },
  { from: 'data', to: 'ops' },
]

export function DepartmentHub() {
  return (
    <CircularHub
      title="The AI-Native Business"
      subtitle="A business operating primarily through autonomous AI agents"
      centerTitle="Agent"
      centerSubtitle="Command Center"
      centerIcon="Cpu"
      centerTagline="Orchestration & Observability"
      nodes={departments}
      connections={connections}
    />
  )
}
