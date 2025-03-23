import defaults from './defaults'

const users= {
  usersList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user',
    },
  },
 
}

export default users
