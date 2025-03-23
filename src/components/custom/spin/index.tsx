const Spinner = ({ size = 'w-4 h-4', color = 'border-white' }) => {
  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`animate-spin rounded-full border-2 border-dashed border-t-transparent ${size} ${color}`}
      />
    </div>
  )
}

export default Spinner
