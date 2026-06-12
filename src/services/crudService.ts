import { apiClient, isMockMode } from './apiClient'

interface Entity { _id: string }

export interface CrudService<T extends Entity> {
  list(params?: Record<string, unknown>): Promise<T[]>
  getById(id: string): Promise<T>
  create(payload: Omit<T, '_id'> & { _id?: string }): Promise<T>
  update(id: string, payload: Partial<T>): Promise<T>
  remove(id: string): Promise<void>
}

interface CrudOptions<T> {
  fixtures?: T[]
  forceMock?: boolean
  mockLatencyMs?: number
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function createCrudService<T extends Entity>(
  resourcePath: string,
  options: CrudOptions<T> = {},
): CrudService<T> {
  const { fixtures = [], forceMock = false, mockLatencyMs = 150 } = options
  // In-memory copy so mock create/update/remove behave like a real backend within a session
  let store = [...fixtures]
  const mock = () => forceMock || isMockMode()

  return {
    async list(params) {
      if (mock()) { await delay(mockLatencyMs); return [...store] }
      const { data } = await apiClient.get<T[]>(resourcePath, { params })
      return data
    },
    async getById(id) {
      if (mock()) {
        await delay(mockLatencyMs)
        const found = store.find((e) => e._id === id)
        if (!found) throw new Error(`${resourcePath}/${id} not found`)
        return found
      }
      const { data } = await apiClient.get<T>(`${resourcePath}/${id}`)
      return data
    },
    async create(payload) {
      if (mock()) {
        await delay(mockLatencyMs)
        const created = { ...payload, _id: payload._id || crypto.randomUUID() } as T
        store = [...store, created]
        return created
      }
      const { data } = await apiClient.post<T>(resourcePath, payload)
      return data
    },
    async update(id, payload) {
      if (mock()) {
        await delay(mockLatencyMs)
        const index = store.findIndex((e) => e._id === id)
        if (index === -1) throw new Error(`${resourcePath}/${id} not found`)
        store[index] = { ...store[index], ...payload }
        return store[index]
      }
      const { data } = await apiClient.patch<T>(`${resourcePath}/${id}`, payload)
      return data
    },
    async remove(id) {
      if (mock()) {
        await delay(mockLatencyMs)
        store = store.filter((e) => e._id !== id)
        return
      }
      await apiClient.delete(`${resourcePath}/${id}`)
    },
  }
}
