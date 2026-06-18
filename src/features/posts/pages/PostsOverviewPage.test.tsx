import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '@/test/renderWithProviders'
import PostsOverviewPage from './PostsOverviewPage'
import * as postService from '@/services/postService'

describe('PostsOverviewPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<PostsOverviewPage />, { route: '/posts' })
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders post titles from fixture', async () => {
    renderWithProviders(<PostsOverviewPage />, { route: '/posts' })
    expect(await screen.findByText('AI Revolution in Marketing')).toBeInTheDocument()
    expect(await screen.findByText('The Future of Content Creation')).toBeInTheDocument()
    expect(await screen.findByText('Spring Collection Launch')).toBeInTheDocument()
  })

  it('shows error state when service fails', async () => {
    vi.spyOn(postService.postService, 'list').mockRejectedValueOnce(new Error('Network error'))
    renderWithProviders(<PostsOverviewPage />, { route: '/posts' })
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
