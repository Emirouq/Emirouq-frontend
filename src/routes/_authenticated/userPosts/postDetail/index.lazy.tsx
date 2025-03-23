import { createLazyFileRoute } from '@tanstack/react-router'
import PostDetails from '@/features/userPosts/postDetails'

export const Route = createLazyFileRoute('/_authenticated/userPosts/postDetail/')({
  component: PostDetails,
})
