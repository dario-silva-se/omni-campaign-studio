import { campaignsFixture } from '@/mocks/fixtures/campaigns'

describe('domain fixtures', () => {
  it('fixtures satisfy the Campaign type', () => {
    expect(campaignsFixture.length).toBeGreaterThanOrEqual(2)
    expect(campaignsFixture[0]._id).toBe('cmp-001')
    expect(campaignsFixture.every((c) => c.channels.length > 0)).toBe(true)
  })
})
