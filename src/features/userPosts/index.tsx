import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const dummyPosts: any = [
  { id: 1, userId: 101, content: 'This is my first post!', status: 'pending' },
  { id: 2, userId: 102, content: 'Loving this platform!', status: 'pending' },
  {
    id: 3,
    userId: 103,
    content: 'Admin, please review my post.',
    status: 'approved',
  },
]

export default function UserPosts() {
  const [posts, setPosts] = useState<any>([])

  useEffect(() => {
    // Simulate fetching data
    setPosts(dummyPosts)
  }, [])

  const handleStatusChange = (id: any, newStatus: any) => {
    setPosts(
      posts.map((post: any) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    )
  }

  return (
    <div>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <div className='mx-4 my-20 space-y-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>User Posts</h2>
          <p className='text-muted-foreground'>Manage user posts here.</p>
        </div>

        <div className='space-y-4'>
          {posts.map((post: any) => (
            <div
              key={post.id}
              className='flex items-center justify-between rounded-lg border p-4'
            >
              <div>
                <p className='text-lg font-semibold'>{post.content}</p>
                <p className='text-sm text-gray-500'>Status: {post.status}</p>
              </div>
              {post.status === 'pending' && (
                <div className='flex space-x-2'>
                  <Button
                    // variant='success'
                    onClick={() => handleStatusChange(post.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant='destructive'
                    onClick={() => handleStatusChange(post.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
