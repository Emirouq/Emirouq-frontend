//@ts-nocheck
import { useState, useEffect } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { debounce } from 'lodash'
import { useGetPosts } from '@/hooks/Post/query'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/post-columns'
import { PostTable } from './components/post-table'

const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'rejected',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
]

export default function UserPosts() {
  const [activeTab, setActiveTab] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [startIndex, setStartIndex] = useState<number>(1)
  const [viewPage, setViewPage] = useState(10)
  const {
    data,
    refetch: refetchPosts,
    isFetching,
  } = useGetPosts({
    query: {
      status: activeTab === 'all' ? '' : activeTab,
      start: startIndex,
      limit: viewPage,
      keyword,
    },
  })
  const [totalCount, setTotalCount] = useState<number>(data?.count)
  const searchParams = useSearch({ from: '/_authenticated/userPosts/' })
  const navigate = useNavigate()

  useEffect(() => {
    const currentTab = new URLSearchParams(location.search).get('tab')

    if (activeTab && currentTab !== activeTab) {
      updateSearchParams({ tab: activeTab })
      refetchPosts()
    }
  }, [activeTab])

  const updateSearchParams = (params: any) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...params,
      }),
    })
  }

  useEffect(() => {
    refetchPosts()
  }, [startIndex, viewPage, keyword])

  const action = (keyword: any) => {
    setKeyword(keyword)
  }
  const debounceSearch = debounce(action, 500)

  return (
    <div>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex-col flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Posts</h2>
            <p className='text-muted-foreground'>Manage your posts here.</p>
          </div>
          <div className='flex gap-x-2'>
            <Input
              placeholder='Search post...'
              onChange={(e) => {
                debounceSearch(e.target.value)
              }}
              className=''
            />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <Tabs defaultValue='all' onValueChange={(e) => setActiveTab(e)}>
            <TabsList className='mb-2'>
              {tabs?.map((val) => {
                return (
                  <TabsTrigger className='w-[150px]' value={val?.value}>
                    {val?.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <PostTable
              data={data}
              columns={columns()}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              isFetching={isFetching}
              viewPage={viewPage}
              setViewPage={setViewPage}
            />
          </Tabs>
        </div>
      </Main>
    </div>
  )
}
