import { describe, it, expect, beforeEach, vi } from 'vitest'
import { tokenStore } from './tokenStore'

beforeEach(() => {
  tokenStore.clear()
  tokenStore.registerRefresh(null)
})

describe('tokenStore', () => {
  it('stores and clears the access token', () => {
    expect(tokenStore.get()).toBeNull()
    tokenStore.set('abc')
    expect(tokenStore.get()).toBe('abc')
    tokenStore.clear()
    expect(tokenStore.get()).toBeNull()
  })

  it('delegates refresh to the registered handler', async () => {
    expect(await tokenStore.refresh()).toBe(false) // none registered
    const handler = vi.fn().mockResolvedValue(true)
    tokenStore.registerRefresh(handler)
    expect(await tokenStore.refresh()).toBe(true)
    expect(handler).toHaveBeenCalledOnce()
  })
})
