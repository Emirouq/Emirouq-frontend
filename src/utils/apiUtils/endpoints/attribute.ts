import defaults from './defaults'

const prefix = '/attributes'

const attribute = {
  getAttributes: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:subCategoryId',
    },
  },
  getAttributeOptions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:attributeId/options`,
    },
  },
  getParentAttributeOptions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:parentId/options/children`,
    },
  },
  updateAttributeOptions: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/update-attribute/:attributeId`,
    },
  },
  deleteAttributeOptions: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/delete-attribute/:attributeId`,
    },
  },
  addAttributeOptions: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/add-attribute-option/:attributeId`,
    },
  },
}

export default attribute
