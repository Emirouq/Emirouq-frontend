import { RxCross2 } from 'react-icons/rx'

const CustomUpload = ({ file, setFile, label }: any) => {
  return (
    <div>
      <label className='block text-sm font-medium'>{label}</label>
      <>
        {file?.url !== undefined && file?.url !== '' ? (
          <div className='mb-3 flex gap-1'>
            <div
              className='flex'
              style={{
                position: 'relative',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                src={file?.url}
                alt='file'
              />
            </div>
            <div
              className='flex cursor-pointer justify-start'
              onClick={() => {
                setFile({ url: '', file: '' })
              }}
            >
              <RxCross2 />
            </div>
          </div>
        ) : (
          <label className='item-center flex w-max' htmlFor='upload_thumbnail'>
            <div className='cursor-pointer'>
              <div className='mt-2 rounded-xl md:mt-2'>
                <div className='ml-2 mt-2 flex items-center justify-center rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='40'
                    height='40'
                    fill='gray'
                    className='bi bi-person-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                    <path
                      fill-rule='evenodd'
                      d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </label>
        )}
        <input
          type='file'
          max={1}
          id='upload_thumbnail'
          accept='.jpg, .jpeg, .png , .pdf'
          onChange={(e: any) => {
            if (e.target.files[0]) {
              const url = URL.createObjectURL(e.target.files[0])
              setFile({ url, file: e.target.files[0] })
            }

            e.target.value = null
            return false
          }}
          placeholder=''
          className='hidden h-8 bg-gray-100 text-gray-800'
        />
      </>
    </div>
  )
}

export default CustomUpload
