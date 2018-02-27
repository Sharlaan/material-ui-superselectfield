/*
  Utilities functions and polyfills
 */
import PropTypes from 'prop-types';

export function entries(obj) {
  return 'entries' in Object
    ? Object.entries(obj)
    : Object.keys(obj).map(prop => [prop, obj[prop]]);
}

export function areEqual(val1, val2) {
  if ((val1 === 0 || val2 === 0) && val1 === val2) return true;
  else if (!val1 || !val2 || typeof val1 !== typeof val2) return false;
  else if (typeof val1 === 'string' || typeof val1 === 'number' || typeof val1 === 'boolean')
    return val1 === val2;
  else if (typeof val1 === 'object') {
    return (
      Object.keys(val1).length === Object.keys(val2).length &&
      entries(val2).every(([key2, value2]) => val1[key2] === value2)
    );
  }
}

// Counts nodes with non-null value property without optgroups
// noinspection JSMethodCanBeStatic
export function getChildrenLength(children) {
  if (!children) return 0;
  else if (Array.isArray(children) && children.length) {
    return children.reduce((count, { type, props: { value, children: cpc } }) => {
      if (type === 'optgroup') {
        if (cpc) {
          if (Array.isArray(cpc)) {
            for (let c of cpc) {
              if (c.props.value) ++count;
            }
          } else if (typeof cpc === 'object' && cpc.props.value) ++count;
        }
      } else if (value) ++count;
      return count;
    }, 0);
  } else if (!Array.isArray(children) && typeof children === 'object') {
    if (children.type === 'optgroup') return getChildrenLength(children.props.children);
    else if (children.props.value) return 1;
  }
  return 0;
}

export const checkFormat = value => value.findIndex(v => typeof v !== 'object' || !('value' in v));

export const objectShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string,
});
