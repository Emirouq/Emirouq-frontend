import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { debounce } from 'lodash'
import { an } from 'node_modules/@faker-js/faker/dist/airline-CBNP41sR'
import { useGetUsers } from '@/hooks/Users/query'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DeleteConfirmationModal from '@/components/custom/deleteModal'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'

const tabs = [
  {
    label: 'Frequent',
    value: 'frequent',
  },
  {
    label: 'Rare',
    value: 'rare',
  },
]

export default function Users() {
  const [activeTab, setActiveTab] = useState('frequent')
  const [keyword, setKeyword] = useState('')
  const [startIndex, setStartIndex] = useState<number>(1)
  const [viewPage, setViewPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    data,
    refetch: refetchUser,
    isFetching,
  }: any = useGetUsers({
    query: {
      // status: activeTab === 'all' ? '' : activeTab,
      start: startIndex,
      limit: viewPage,
      keyword,
    },
  })

  useEffect(() => {
    const currentTab = new URLSearchParams(location.search).get('tab')

    if (activeTab && currentTab !== activeTab) {
      updateSearchParams({ tab: activeTab })
      refetchUser()
    }
  }, [activeTab])

  const updateSearchParams = (params: any) => {
    navigate({
      search: ((prev: any) => ({
        ...prev,
        ...params,
      })) as any,
    })
  }

  useEffect(() => {
    refetchUser()
  }, [startIndex, viewPage, keyword])

  const action = (keyword: any) => {
    setKeyword(keyword)
  }
  const debounceSearch = debounce(action, 500)

  const handleDelete = async () => {
    setLoading(true)
    try {
      // API call here
      await new Promise((res) => setTimeout(res, 1000))
      console.log('Item deleted!')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <UsersProvider>
      <Header fixed>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex-col flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>

          <div className='flex gap-x-2'>
            <Input
              placeholder='Search users...'
              onChange={(e) => {
                debounceSearch(e.target.value)
              }}
              className=''
            />
          </div>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <Tabs defaultValue={activeTab} onValueChange={(e) => setActiveTab(e)}>
            <TabsList className='mb-2'>
              {tabs?.map((val) => {
                return (
                  <TabsTrigger className='w-[150px]' value={val?.value}>
                    {val?.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <UsersTable
              data={data || []}
              columns={columns({
                open,
                setOpen,
              })}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              isFetching={isFetching}
              viewPage={viewPage}
              setViewPage={setViewPage}
            />
          </Tabs>
        </div>
      </Main>
      <UsersDialogs />

      <DeleteConfirmationModal
        open={open}
        setOpen={setOpen}
        title='Delete User?'
        description='Do you really want to delete?'
        onConfirm={handleDelete}
        loading={loading}
      />
    </UsersProvider>
  )
}
