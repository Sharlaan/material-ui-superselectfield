const _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
      return typeof obj
    }
    : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }

/*
  Utilities functions and polyfills
 */
export function entries (obj) {
  return 'entries' in Object
    ? Object.entries(obj)
    : Object.keys(obj).map(function (prop) {
      return [prop, obj[prop]]
    })
}

export function areEqual (val1, val2) {
  if ((val1 === 0 || val2 === 0) && val1 === val2) return true
  else if (
    !val1 ||
    !val2 ||
    (typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) !==
      (typeof val2 === 'undefined' ? 'undefined' : _typeof(val2))
  ) {
    return false
  } else if (typeof val1 === 'string' || typeof val1 === 'number' || typeof val1 === 'boolean') return val1 === val2
  else if ((typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) === 'object') {
    return (
      Object.keys(val1).length === Object.keys(val2).length &&
      entries(val2).every(function (_ref) {
        let key2 = _ref[0],
          value2 = _ref[1]
        return val1[key2] === value2
      })
    )
  }
}

// Counts nodes with non-null value property without optgroups
// noinspection JSMethodCanBeStatic
export function getChildrenLength (children) {
  if (!children) return 0
  else if (Array.isArray(children) && children.length) {
    return children.reduce(function (count, _ref2) {
      let type = _ref2.type,
        _ref2$props = _ref2.props,
        value = _ref2$props.value,
        cpc = _ref2$props.children

      if (type === 'optgroup') {
        if (cpc) {
          if (Array.isArray(cpc)) {
            for (
              var _iterator = cpc,
                _isArray = Array.isArray(_iterator),
                _i = 0,
                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
              ;

            ) {
              var _ref3

              if (_isArray) {
                if (_i >= _iterator.length) break
                _ref3 = _iterator[_i++]
              } else {
                _i = _iterator.next()
                if (_i.done) break
                _ref3 = _i.value
              }

              const c = _ref3

              if (c.props.value) ++count
            }
          } else if ((typeof cpc === 'undefined' ? 'undefined' : _typeof(cpc)) === 'object' && cpc.props.value) ++count
        }
      } else if (value || value === 0) ++count
      return count
    }, 0)
  } else if (
    !Array.isArray(children) &&
    (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object'
  ) {
    if (children.type === 'optgroup') return getChildrenLength(children.props.children)
    else if (children.props.value) return 1
  }
  return 0
}

export var checkFormat = function checkFormat (value) {
  return value.findIndex(function (v) {
    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object' || !('value' in v)
  })
}
