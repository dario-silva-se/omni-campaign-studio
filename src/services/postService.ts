import type { Post } from '@/types'
import { createCrudService } from './crudService'
import { postsFixture } from '@/mocks/fixtures/posts'

export const postService = createCrudService<Post>('/posts', {
  fixtures: postsFixture,
})
