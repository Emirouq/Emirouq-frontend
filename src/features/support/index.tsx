import { useState } from 'react'
import { debounce } from 'lodash'
import { useGetSupport } from '@/hooks/Support/query'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/support-columns'
import { SupportTable } from './components/support-table'

const Support = () => {
  const [startIndex, setStartIndex] = useState<number>(1)
  const [viewPage, setViewPage] = useState(10)
  const [keyword, setKeyword] = useState('')
  const { data, isFetching }: any = useGetSupport({
    query: { keyword, page: startIndex, limit: viewPage },
  })

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
            <h2 className='text-2xl font-bold tracking-tight'>Support</h2>
            <p className='text-muted-foreground'>
              Manage support tickets here.
            </p>
          </div>
          <div className='flex gap-x-2'>
            <Input
              placeholder='Search tickets...'
              onChange={(e) => {
                debounceSearch(e.target.value)
              }}
              className=''
            />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <SupportTable
            data={data}
            columns={columns()}
            isFetching={isFetching}
            startIndex={startIndex}
            viewPage={viewPage}
            setViewPage={setViewPage}
            setStartIndex={setStartIndex}
          />
        </div>
      </Main>
    </div>
  )
}

export default Support
