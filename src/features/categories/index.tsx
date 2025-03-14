import { useState } from 'react'
import { useGetCategories } from '@/hooks/Category/query'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AddCategory from './addCategory'
import { columns } from './components/category-columns'
import { CategoryTable } from './components/category-table'

export default function Categories() {
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState()
  const [title, setTitle] = useState('')
  const [logo, setLogo] = useState({ url: '', file: '' })
  const { data, isLoading, error, refetch }: any = useGetCategories()

  return (
    <div>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Categories</h2>
            <p className='text-muted-foreground'>
              Manage your categories and their products here.
            </p>
          </div>
          <AddCategory
            open={open}
            setOpen={setOpen}
            setEditId={setEditId}
            editId={editId}
            refetch={refetch}
            title={title}
            setTitle={setTitle}
            logo={logo}
            setLogo={setLogo}
          />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CategoryTable
            data={data}
            columns={columns({
              open,
              setOpen,
              editId,
              setEditId,
              setTitle,
              setLogo,
            })}
          />
        </div>
      </Main>
    </div>
  )
}
