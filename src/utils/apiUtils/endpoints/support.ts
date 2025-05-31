import defaults from './defaults'

const support = {
  getSupportTickets: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/support/admin',
    },
  },
  respondToTicket: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/support/:id',
    },
  },
}

export default support
