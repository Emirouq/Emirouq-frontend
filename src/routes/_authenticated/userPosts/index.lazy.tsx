import { createLazyFileRoute } from '@tanstack/react-router'
import UserPosts from '@/features/userPosts'

export const Route = createLazyFileRoute('/_authenticated/userPosts/')({
  component: UserPosts,
})
