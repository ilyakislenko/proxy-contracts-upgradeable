import './Toast.css'
interface ToastProps {
  text: string
  ToastType: 'success' | 'error'
}
export const Toast: React.FC<ToastProps> = ({ text, ToastType }) => {
  return (
        <div className={`Toast toast-${ToastType}`}>
          <p>{text}</p>
      </div>
  )
}
