import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { debounce } from 'lodash'
import { useDeleteSubCategory } from '@/hooks/Category/mutation'
import { useGetSubCategories } from '@/hooks/Category/query'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AddSubCategory from './addSubCategory'
import { columns } from './components/subcategory-columns'
import { SubCategoryTable } from './components/subcategory-table'
import { ConfirmDelete } from './confirm-delete'

export default function Subcategory() {
  const [open, setOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState('' as any)
  const [editDetails, setEditDetails] = useState(null as any)
  const { id: categoryId }: any = useParams({ strict: false })
  const [keyword, setKeyword] = useState('')
  const { data, refetch: refetchSubCategories }: any = useGetSubCategories({
    categoryId,
    keyword,
  })
  const action = (keyword: any) => {
    setKeyword(keyword)
  }
  const debounceSearch = debounce(action, 500)
  const deleteSubCategory = useDeleteSubCategory()

  const onConfirmDelete = (subCategoryId: string) => {
    deleteSubCategory
      .mutateAsync({ pathParams: { subCategoryId } })
      .then(() => {
        refetchSubCategories()
        setDeleteModal('')
      })
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
      <Main>
        <div className='mb-2 flex-col flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Sub Categories
            </h2>
            <p className='text-muted-foreground'>
              Manage your categories and their products here.
            </p>
          </div>
          <div className='flex gap-x-2'>
            <Input
              placeholder='Search subcategories...'
              onChange={(e) => {
                debounceSearch(e.target.value)
              }}
            />
            <AddSubCategory
              open={open}
              setOpen={setOpen}
              editDetails={editDetails}
              refetch={refetchSubCategories}
            />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <SubCategoryTable
            data={data}
            columns={columns({
              open,
              setOpen,
              setEditDetails,
              onConfirmDelete,
              loading: deleteSubCategory.isPending,
              setDeleteModal,
              deleteModal,
            })}
          />
        </div>
        <ConfirmDelete
          open={!!deleteModal}
          onConfirm={() => {
            onConfirmDelete(deleteModal)
          }}
          setOpen={setDeleteModal}
          loading={deleteSubCategory.isPending}
        />
      </Main>
    </div>
  )
}
