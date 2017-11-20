/**
 * Takes a hash of types with controls and returns a subset of only the controls that are common across each type.
 * Each key of the object is a type, and each value is an array of associated controls that are applicable to that type.
 *
 * @param {Object} typesWithControlNames - object/hash of types with associated controls
 * @returns {Array} list of controls that are common across currently selected items
 */
export function applicableControls (typesWithControlNames) {
  return Object.keys(typesWithControlNames).reduce((controlNames, control) => {
    return _intersect(controlNames, typesWithControlNames[control])
  }, typesWithControlNames[Object.keys(typesWithControlNames)[0]]) || []
}

function _intersect (a, b) {
  return a.filter((value) => {
    return b.includes(value)
  })
}
