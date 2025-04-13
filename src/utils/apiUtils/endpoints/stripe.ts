import defaults from './defaults'

const stripe= {
  createPlan: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v2,
      uri: '/stripe/create-plan',
    },
  },
 
}

export default stripe
