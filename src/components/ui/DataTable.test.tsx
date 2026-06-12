import { render, screen } from '@testing-library/react'
import { DataTable, type Column } from './DataTable'

interface Row { _id: string; name: string; leads: number }
const rows: Row[] = [
  { _id: '1', name: 'Alpha', leads: 10 },
  { _id: '2', name: 'Beta', leads: 20 },
]
const columns: Column<Row>[] = [
  { key: 'name', header: 'Nome' },
  { key: 'leads', header: 'Leads', align: 'right' },
  { key: 'actions', header: '', render: (row) => <button>Ver {row.name}</button> },
]

describe('DataTable', () => {
  it('renders headers and rows', () => {
    render(<DataTable columns={columns} rows={rows} caption="Campanhas" />)
    expect(screen.getByRole('table', { name: 'Campanhas' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument()
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver Beta' })).toBeInTheDocument()
  })
  it('renders empty state', () => {
    render(<DataTable columns={columns} rows={[]} caption="Campanhas" emptyMessage="Nenhum item" />)
    expect(screen.getByText('Nenhum item')).toBeInTheDocument()
  })
})
