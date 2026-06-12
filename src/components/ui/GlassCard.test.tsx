import { render, screen } from '@testing-library/react'
import { GlassCard } from './GlassCard'

describe('GlassCard', () => {
  it('composes Header/Title/Body/Footer', () => {
    render(
      <GlassCard aria-label="resultados">
        <GlassCard.Header>
          <GlassCard.Title>Resultados Gerais</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Body>conteúdo</GlassCard.Body>
        <GlassCard.Footer>rodapé</GlassCard.Footer>
      </GlassCard>,
    )
    expect(screen.getByRole('heading', { name: 'Resultados Gerais' })).toBeInTheDocument()
    expect(screen.getByText('conteúdo')).toBeInTheDocument()
    expect(screen.getByText('rodapé')).toBeInTheDocument()
  })
})
