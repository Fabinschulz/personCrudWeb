import { useEffect } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

interface ToastProps {
  message: string
  type: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 6000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      role="alert"
      className={`fixed bottom-0 m-6 flex items-end justify-items-start rounded px-4 py-3 font-bold text-white transition-opacity duration-500 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div className="mr-4">
        {type === 'success' ? (
          <FaCheck className="text-2xl" />
        ) : (
          <FaTimes className="text-2xl" />
        )}
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm">{message}</p>

        <button
          type="button"
          className="ml-3 opacity-50 transition-opacity duration-500 hover:opacity-100"
          onClick={onClose}
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  )
}

export default Toast
