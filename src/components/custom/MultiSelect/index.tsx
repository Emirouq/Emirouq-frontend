import Select from 'react-select'

const MultiSelect = ({ data, value, field }: any) => {
  return (
    <div>
      <Select
        isMulti
        options={data}
        className='react-select-container'
        classNamePrefix='react-select'
        value={value}
        onChange={(selectedOptions) =>
          field.onChange(selectedOptions.map((opt) => opt.value))
        }
      />
    </div>
  )
}

export default MultiSelect
