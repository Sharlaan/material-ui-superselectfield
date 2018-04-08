export default {
  errorStyle: {},
  errorText: '',
  hintText: 'Click me',
  selectionsRenderer: (values, hintText) => {
    if (!values) return hintText;
    const { value, label } = values;
    if (Array.isArray(values)) {
      return values.length ? values.map(({ value, label }) => label || value).join(', ') : hintText;
    } else if (label || value) return label || value;
    else return hintText;
  },
  underlineErrorStyle: {},
};
