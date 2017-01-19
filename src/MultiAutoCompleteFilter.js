import React, {PropTypes} from 'react'
import Select from 'react-select'
import classNames from 'classnames'

const MultiAutoCompleteFilter = ({name, placeholder, dataSource, value, style, className, onChange, onClick}) => (
  <Select
    name={name}
    onChange={onChange}
    onClick={onClick}
    options={dataSource}
    value={value}
    backspaceRemoves={false}
    multi
    className={classNames('multi-autocomplete', className)}
    placeholder={placeholder}
    style={{width: 540, ...style}}
    menuContainerStyle={style}
  />
)

MultiAutoCompleteFilter.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  }),
  style: PropTypes.object,
  className: PropTypes.string
}

MultiAutoCompleteFilter.defaultProps = {}

export default MultiAutoCompleteFilter
