'use client'

import { useLocation, useParams } from '@tanstack/react-router'
import { useGetAttributes } from '@/hooks/Attributes/query'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SelectField } from './selectField'

export default function Attributes() {
  const { id } = useParams({ strict: false })
  const location: any = useLocation()
  const { data, isFetching }: any = useGetAttributes({
    subCategoryId: id,
    keyword: '',
  })
  if (isFetching) {
    return <></>
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
        <div className='mb-4'>
          <div className='text-2xl font-bold capitalize tracking-tight'>
            {location?.state.label} Attributes
          </div>
          <p className='text-muted-foreground'>Manage your attributes here</p>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          {data?.data?.map((attr: any) => {
            return (
              <div
                key={attr.uuid}
                className='flex w-full flex-col items-start gap-4 md:flex-row'
              >
                <label className='font-semibold'>{attr.label}:</label>

                <div className='flex flex-1 gap-2'>
                  {attr.filterType === 'select' ? (
                    <SelectField
                      attributeId={attr.uuid}
                      list={data?.data}
                      dependsOn={attr.dependsOn}
                      label={attr.label}
                    />
                  ) : (
                    <>--</>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Main>
    </div>
  )
}
