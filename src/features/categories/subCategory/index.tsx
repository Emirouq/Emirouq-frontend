import { useEffect, useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation } from '@tanstack/react-router'
import { useGetSubCategories } from '@/hooks/Category/query'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AddSubCategory from './addSubCategory'
import { columns } from './components/subcategory-columns'
import { SubCategoryTable } from './components/subcategory-table'

export default function Subcategory() {
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState()
  const [_, setTitle] = useState('')
  const [properties, setProperties] = useState([''])
  const params: any = useLocation()
  const { data, refetch: refetchSubCategories }: any = useGetSubCategories({
    pathParams: { id: params?.search?.categoryId },
  })
  useEffect(() => {
    if (params?.search?.categoryId) {
      refetchSubCategories()
    }
  }, [params?.search?.categoryId])

  const formSchema = z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

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
            <h2 className='text-2xl font-bold tracking-tight'>
              Sub Categories
            </h2>
            <p className='text-muted-foreground'>
              Manage your categories and their products here.
            </p>
          </div>
          <AddSubCategory
            open={open}
            setOpen={setOpen}
            setEditId={setEditId}
            editId={editId}
            refetch={refetchSubCategories}
            properties={properties}
            setProperties={setProperties}
            form={form}
          />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <SubCategoryTable
            data={data}
            columns={columns({
              open,
              setOpen,
              editId,
              setEditId,
              setTitle,
              setProperties,
              form,
            })}
          />
        </div>
      </Main>
    </div>
  )
}
