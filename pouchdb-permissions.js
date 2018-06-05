const isString = require('lodash/isString')
const isArray = require('lodash/isArray')
const isPlainObject = require('lodash/isPlainObject')
const merge = require('lodash/merge')
const union = require('lodash/union')
const uniq = require('lodash/uniq')
const difference = require('lodash/difference')
const get = require('lodash/get')
const set = require('lodash/set')

const PouchDBPermissions = {
  securityFactory: function () {
    return {
      admins: {
        names: [],
        roles: []
      },
      members: {
        names: [],
        roles: []
      }
    }
  },

  fetchPermissions: async function () {
    let security = await this.get('_security')
    return merge(PouchDBPermissions.securityFactory(), security)
  },

  putPermissions: async function (permissions) {
    return this.request({
      method: 'PUT',
      url: '_security',
      body: permissions
    })
  },

  addOwners: async function (owners) {
    return this.addNames(owners, ['admins', 'members'])
  },

  removeOwners: async function (owners) {
    return this.removeNames(owners, ['admins', 'members'])
  },

  setOwners: async function (owners) {
    return this.setNames(owners, ['admins', 'members'])
  },

  addAdmins: async function (names, roles) {
    let permissions = await this.fetchPermissions()
    let data = getNamesAndRolesArrays(names, roles)

    setByUnion(permissions, 'admins.names', data.names)
    setByUnion(permissions, 'admins.roles', data.roles)

    return this.putPermissions(permissions)
  },

  removeAdmins: async function (names, roles) {
    let permissions = await this.fetchPermissions()
    let data = getNamesAndRolesArrays(names, roles)

    setByDifference(permissions, 'admins.names', data.names)
    setByDifference(permissions, 'admins.roles', data.roles)

    return this.putPermissions(permissions)
  },

  setAdmins: async function (names, roles) {
    let permissions = await this.fetchPermissions()
    let data = getNamesAndRolesArrays(names, roles)

    set(permissions, 'admins.names', data.names)
    set(permissions, 'admins.roles', data.roles)

    return this.putPermissions(permissions)
  },

  addMembers: async function (names, roles) {
    let permissions = await this.fetchPermissions()
    let data = getNamesAndRolesArrays(names, roles)

    setByUnion(permissions, 'members.names', data.names)
    setByUnion(permissions, 'members.roles', data.roles)

    return this.putPermissions(permissions)
  },

  removeMembers: async function (names, roles) {
    let permissions = await this.fetchPermissions()
    let data = getNamesAndRolesArrays(names, roles)

    setByDifference(permissions, 'members.names', data.names)
    setByDifference(permissions, 'members.roles', data.roles)

    return this.putPermissions(permissions)
  },

  setMembers: async function (names, roles) {
    let permissions = await this.fetchPermissions()
    let data = getNamesAndRolesArrays(names, roles)

    set(permissions, 'members.names', data.names)
    set(permissions, 'members.roles', data.roles)

    return this.putPermissions(permissions)
  },

  addNames: async function (names, groups) {
    let permissions = await this.fetchPermissions()

    names = ensureArray(names)
    groups = ensureArray(groups)

    groups.forEach(function (group) {
      setByUnion(permissions, group + '.names', names)
    })

    return this.putPermissions(permissions)
  },

  removeNames: async function (names, groups) {
    let permissions = await this.fetchPermissions()

    names = ensureArray(names)
    groups = ensureArray(groups)

    groups.forEach(function (group) {
      setByDifference(permissions, group + '.names', names)
    })

    return this.putPermissions(permissions)
  },

  setNames: async function (names, groups) {
    let permissions = await this.fetchPermissions()

    names = ensureArray(names)
    groups = ensureArray(groups)

    groups.forEach(function (group) {
      set(permissions, group + '.names', names)
    })

    return this.putPermissions(permissions)
  },

  addRoles: async function (roles, groups) {
    let permissions = await this.fetchPermissions()

    roles = ensureArray(roles)
    groups = ensureArray(groups)

    groups.forEach(function (group) {
      setByUnion(permissions, group + '.roles', roles)
    })

    return this.putPermissions(permissions)
  },

  removeRoles: async function (roles, groups) {
    let permissions = await this.fetchPermissions()

    roles = ensureArray(roles)
    groups = ensureArray(groups)

    groups.forEach(function (group) {
      setByDifference(permissions, group + '.roles', roles)
    })

    return this.putPermissions(permissions)
  },

  setRoles: async function (roles, groups) {
    let permissions = await this.fetchPermissions()

    roles = ensureArray(roles)
    groups = ensureArray(groups)

    groups.forEach(function (group) {
      set(permissions, group + '.roles', roles)
    })

    return this.putPermissions(permissions)
  }
}

function ensureArray (val) {
  if (isString(val)) {
    return [val]
  } else if (isArray(val)) {
    return val
  } else {
    return []
  }
}

function getNamesAndRolesArrays (names, roles) {
  let result = {}

  if (isPlainObject(names)) {
    result.names = ensureArray(names.names)
    result.roles = ensureArray(names.roles)

    return result
  }

  result.names = uniq(ensureArray(names))
  result.roles = uniq(ensureArray(roles))

  return result
}

function setByUnion (obj, path, data) {
  set(obj, path, union(get(obj, path), data))
  return obj
}

function setByDifference (obj, path, data) {
  set(obj, path, difference(get(obj, path), data))
  return obj
}

module.exports = PouchDBPermissions
