import { FC, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

type modalProps = {
  children: React.ReactNode
  isVisible: boolean
  onClose: CallableFunction
  width?: string | number
  className?: string
  isLoginModal?: React.Dispatch<React.SetStateAction<boolean>>
  loginModal?: boolean
  zIndex?: number
  closeIcon?: boolean
  title?: string | React.ReactNode
}

const Modal: FC<modalProps> = ({
  children,
  isVisible,
  onClose,
  width,
  className,
  isLoginModal,
  loginModal,
  zIndex,
  closeIcon,
  title,
}) => {
  // const { isVisible, setModal } = modalProps;
  // useEffect(() => {
  // const close = (e: any) => {
  //   if (e.keyCode === 27) {
  //     onClose();
  //   }
  // };
  // window.addEventListener("keydown", close);
  // return () => window.removeEventListener("keydown", close);
  // }, []);
  useEffect(() => {
    if (isVisible) {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isVisible])
  return (
    <div>
      {isVisible && (
        <div className='over flex justify-center'>
          <div
            onClick={(e) => {
              !isLoginModal && e.stopPropagation()
              !isLoginModal && e.preventDefault()
              !isLoginModal && onClose(false)
            }}
            className={`modal backdrop-blur-xs flex h-screen justify-center overflow-auto bg-black/60 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            {/* <div className=" w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%]"> */}
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              style={{ width: width, zIndex: zIndex || 1000 }}
              className={`content ${className && className} ${
                loginModal ? 'bg-[#3A2D2D]' : 'top-[10%] bg-white'
              } ${width ? `w-[${width}]` : 'w-[25%]'} `}
            >
              <div className='top px-6 py-4'>
                <div className='bar flex items-center justify-between gap-8'>
                  <span className='text-xl font-semibold'>{title}</span>
                  <span
                    className='cursor-pointer'
                    onClick={() => onClose(false)}
                  >
                    {closeIcon && <IoMdClose className='text-2xl' />}
                  </span>
                </div>
                <div className='py-2'>{children}</div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
