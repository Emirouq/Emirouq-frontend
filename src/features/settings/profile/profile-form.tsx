import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/auth-context'
import { useUpdateUserProfile } from '@/hooks/User/mutation'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Import the hook

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'First Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'First Name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Last Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Last Name must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
  const { user } = useAuth()
  const updateUserProfile = useUpdateUserProfile() // Initialize the hook

  const defaultValues: Partial<ProfileFormValues> = {
    bio: 'I own a computer.',
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    urls: [
      { value: 'https://shadcn.com' },
      { value: 'http://twitter.com/shadcn' },
    ],
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateUserProfile.mutateAsync({ body: data }) // Call the API to update the profile
      toast({
        title: 'Profile updated successfully!',
        // description: (
        //   <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
        //     <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        //   </pre>
        // ),
      })
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: (error as any).message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Last Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}
