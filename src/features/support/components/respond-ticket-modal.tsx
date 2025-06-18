import React, { useState } from 'react'
import { useRespondTicket } from '@/hooks/Support/mutation'
import { useGetSupport } from '@/hooks/Support/query'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const RespondTicket = ({ id }: any) => {
  console.log('id', id)
  const { refetch }: any = useGetSupport({})
  const respondTicket = useRespondTicket()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSendResponse = () => {
    if (message) {
      setLoading(true)
      respondTicket
        .mutateAsync({
          pathParams: { id },
          body: {
            message,
          },
        })
        ?.then(() => {
          toast({
            title: 'Success',
            description: 'Response sent successfully!',
            className: 'bg-orange-500 text-white',
          })
          refetch()
        })
        ?.catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to respond!',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
          })
        })
        ?.finally(() => {
          setLoading(false)
        })
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline'>Respond</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Respond to Ticket</DialogTitle>
            <DialogDescription>
              Send an appropriate response to user with a descriptive message
              below.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name-1'>Message</Label>
              <Input
                id='name-1'
                name='name'
                defaultValue='Hi there!'
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button onClick={onSendResponse}>
              {' '}
              {loading ? (
                <span className='flex items-center'>
                  <svg
                    className='mr-2 h-4 w-4 animate-spin text-white'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z'
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default RespondTicket
