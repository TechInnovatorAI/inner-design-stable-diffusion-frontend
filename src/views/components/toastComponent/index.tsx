import { toast } from 'react-hot-toast'

const ToastComponet = (text: string, type: string) => {
  if (type == 'success') {
    toast.success(`${text}`)
  } else if (type == 'error') {
    toast.error(`${text}`)
  }
}

export default ToastComponet
