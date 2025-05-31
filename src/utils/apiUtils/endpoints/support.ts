import defaults from './defaults'

const support = {
  getSupportTickets: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/support/admin',
    },
  },
}

export default support
