import defaults from './defaults'

const category = {
  //   fetchMe: {
  //     v1: {
  //       ...defaults.methods.GET,
  //       ...defaults.versions.v1,
  //       uri: '/auth/admin/me',
  //     },
  //   },
  createCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/category',
    },
  },
  getCategories: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/category',
    },
  },
  updateCategory: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/category/:id',
    },
  },
  getSubCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/category/subCategory/:id',
    },
  },
  addSubCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/category/subCategory/:id',
    },
  },
  updateSubCategory: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/category/subCategory/:id',
    },
  },
 
}

export default category
