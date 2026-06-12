import { createCrudService } from './crudService'
import type { CrudService } from './crudService'
import { campaignsFixture } from '@/mocks/fixtures/campaigns'
import type { Campaign } from '@/types'

let service: CrudService<Campaign>

beforeEach(() => {
  service = createCrudService<Campaign>('/campaigns', {
    fixtures: campaignsFixture,
    forceMock: true,
    mockLatencyMs: 0,
  })
})

describe('crudService (mock mode)', () => {
  it('lists fixtures', async () => {
    await expect(service.list()).resolves.toHaveLength(2)
  })
  it('gets by id', async () => {
    await expect(service.getById('cmp-001')).resolves.toMatchObject({ name: expect.stringContaining('Q4') })
  })
  it('rejects unknown id', async () => {
    await expect(service.getById('nope')).rejects.toThrow('not found')
  })
  it('creates with generated _id', async () => {
    const created = await service.create({ ...campaignsFixture[0], _id: '' })
    expect(created._id).toBeTruthy()
  })
  it('updates', async () => {
    const updated = await service.update('cmp-002', { status: 'active' })
    expect(updated.status).toBe('active')
  })
  it('removes by id', async () => {
    await service.remove('cmp-001')
    await expect(service.list()).resolves.toHaveLength(1)
  })
  it('update rejects unknown id', async () => {
    await expect(service.update('nope', {})).rejects.toThrow('not found')
  })
  it('getById returns a copy, not a live store reference', async () => {
    const first = await service.getById('cmp-001')
    const originalName = first.name
    first.name = 'mutated'
    const second = await service.getById('cmp-001')
    expect(second.name).toBe(originalName)
  })
})
