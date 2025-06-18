import defaults from './defaults'

const stripe= {
  createPlan: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v2,
      uri: '/stripe/create-plan',
    },
  },
    update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v2,
      uri: '/stripe/plan/:id',
    },
  },
  getPlans: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v2,
      uri: '/stripe/plan-list',
    },
  }, 
}

export default stripe
