export default {
  errorStyle: {},
  errorText: '',
  hintText: 'Click me',
  selectionsRenderer: function selectionsRenderer (values, hintText) {
    if (!values) return hintText
    let value = values.value,
      label = values.label

    if (Array.isArray(values)) {
      return values.length
        ? values
          .map(function (_ref) {
            let value = _ref.value,
              label = _ref.label
            return label || value
          })
          .join(', ')
        : hintText
    } else if (label || value) return label || value
    else return hintText
  },
  underlineErrorStyle: {},
}
