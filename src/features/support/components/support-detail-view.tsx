import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useUpdateStatus } from '@/hooks/Post/mutation'
import { useGetPosts } from '@/hooks/Post/query'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import Spinner from '@/components/custom/spin'

export default function PostDetailsDrawer({ row }: any) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [rejectedReason, setRejectedReason] = useState('')
  const [loading, setLoading] = useState<any>('')
  const updateStatus: any = useUpdateStatus()
  const { refetch }: any = useGetPosts({})
  const onUpdateStatus = (status: any) => {
    setLoading(status)
    updateStatus
      ?.mutateAsync({
        pathParams: { id: row?.original?.uuid },
        body: { status, rejectedReason },
      })
      ?.then((res: any) => {
        console.log('res', res)
        toast({
          variant: 'default',
          description: res?.message,
        })
        refetch()
      })
      ?.catch((err: any) => {
        console.log('err', err)
      })
      ?.finally(() => {
        setLoading('')
      })
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <FaChevronRight className='cursor-pointer text-blue-600' size={16} />
        </DrawerTrigger>
        <DrawerContent className='rounded-t-2xl p-6'>
          <div className='mx-auto flex w-full justify-center gap-10'>
            <div className='min-w-[500px] max-w-[600px]'>
              <DrawerHeader className='border-b pb-4'>
                <DrawerTitle className='text-lg font-bold'>
                  {row?.original?.title}
                </DrawerTitle>
                <DrawerDescription className='text-gray-600'>
                  {row?.original?.description}
                </DrawerDescription>
              </DrawerHeader>
              <ScrollArea className='max-h-[50vh] p-2'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between text-lg font-semibold'>
                    <span className='text-green-600'>
                      ₹{row?.original?.price}
                    </span>
                    <span className='rounded-md bg-gray-200 px-3 py-1 text-sm'>
                      {row?.original?.condition}
                    </span>
                  </div>

                  <div className='text-sm text-gray-600'>
                    📍 {row?.original?.location} - {row?.original?.timePeriod}
                  </div>

                  <div className='mt-2'>
                    <h3 className='mb-2 text-sm font-semibold text-gray-700'>
                      Specifications
                    </h3>
                    <ul className='grid grid-cols-2 gap-2 text-sm'>
                      {row?.original?.properties?.map((prop: any) => (
                        <li
                          key={prop.name}
                          className='flex justify-between rounded-md bg-gray-100 p-2 text-gray-700'
                        >
                          <span className='font-medium'>{prop.name}</span>
                          <span>{prop.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>

              <DrawerFooter className='mt-4 border-t pt-3'>
                <div className='flex items-center gap-x-3'>
                  {row?.original?.status === 'pending' && (
                    <>
                      <Button
                        variant='default'
                        className='w-full'
                        onClick={() => {
                          onUpdateStatus('approved')
                        }}
                      >
                        {loading === 'approved' && <Spinner />}
                        Approve
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant='destructive' className='w-full'>
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Rejection Reason</DialogTitle>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className=''>
                              <Label htmlFor='name' className='text-right'>
                                Reason
                              </Label>
                              <Textarea
                                id='name'
                                value={rejectedReason}
                                className='col-span-3'
                                onChange={(e) => {
                                  setRejectedReason(e?.target?.value)
                                }}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                onUpdateStatus('rejected')
                              }}
                            >
                              {loading === 'rejected' && <Spinner />}
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                  <DrawerClose asChild>
                    <Button variant='outline' className='w-full'>
                      Cancel
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </div>

            <div>
              {row?.original?.file?.length > 0 && (
                <Carousel className='w-full max-w-sm'>
                  <CarouselContent>
                    {row?.original?.file?.map((file: string, index: number) => (
                      <CarouselItem key={index}>
                        <div className='p-1'>
                          <Card
                            className='cursor-pointer shadow-lg transition duration-300 hover:shadow-xl'
                            onClick={() => {
                              setLightboxIndex(index)
                              setLightboxOpen(true)
                            }}
                          >
                            <CardContent className='flex aspect-square items-center justify-center'>
                              <img
                                src={file}
                                className='h-full w-full rounded-lg object-cover'
                                alt={`Product ${index + 1}`}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {row?.original?.file?.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={row?.original?.file?.map((file: string) => ({ src: file }))}
        />
      )}
    </>
  )
}
