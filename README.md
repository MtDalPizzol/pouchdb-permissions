# pouchdb-permissions

This plugin enables you to easily manipulate the `_security` document of a database in PouchDB/CouchDB, on the fly and with a super flexible API.

> **IMPORTANT:** Make sure that the instances which will use this plugin have the permissions required to manipulate the `_security` document. [Learn more](http://docs.couchdb.org/en/2.1.1/api/database/security.html#api-db-security).

Every operation made by the plugin ensures that names and roles are deduplicated for the admins and the members keys in the `_security` document.

## Instalation
```bash
# Using NPM
npm install pouchdb-permissions --save
#Using Yarn
yarn add pouchdb-permissions
```

## Usage

```javascript
import PouchDB from 'pouchdb'
import PoucDBPermissions from 'pouchdb-permissions'

PouchDB.plugin(PouchDBPermissions)

const db = new PouchDB('http://localhost:5984')
```

## API

### db.addAdmins(names, roles)

* **Arguments**:
  * **names**: It can be a `String`, an `Array` of strings, an `Object` or `null`.
  * **roles**: It can be a `String`, an `Array` of strings  or `null`.
* **Returns**: A promise that resolves with the response body.

```javascript
db.addAdmins('mike') // Add mike to admins.names

db.addAdmins(null, 'webmaster') // Add webmaster to admins.roles

db.addAdmins(
  ['john', 'jane'], // Add john and jane to admins.names
  ['finances', 'human_resources'] // Add finances and human_resources to admins.roles
)

db.addAdmins({
  names: 'mike', // Add mike to admins.names
  roles: ['finances', 'stock'] // Add finances and stock to admins.roles
})

db.addAdmins({
  roles: 'webamster' // Add webmaster to admins.roles
})
```

### db.removeAdmins(names, roles)

* **Arguments**:
  * **names**: It can be a `String`, an `Array` of strings, an `Object` or `null`.
  * **roles**: It can be a `String`, an `Array` of strings  or `null`.
* **Returns**: A promise that resolves with the response body.

```javascript
db.removeAdmins('mike') // Remove mike from admins.names

db.removeAdmins(null, 'webmaster') // Remove webmaster from admins.roles

db.removeAdmins(
  ['john', 'jane'], // Remove john and jane from admins.names
  ['finances', 'human_resources'] // Remove finances and human_resources from admins.roles
)

db.removeAdmins({
  names: 'mike', // Remove mike from admins.names
  roles: ['finances', 'stock'] // Remove finances and stock from admins.roles
})

db.removeAdmins({
  roles: 'webamster' // Remove webmaster from admins.roles
})
```

### db.setAdmins(names, roles)

This method completely replace the `admins.names` **AND** `admins.roles` lists.

* **Arguments**:
  * **names**: It can be a `String`, an `Array` of strings, an `Object` or `null`.
  * **roles**: It can be a `String`, an `Array` of strings  or `null`.
* **Returns**: A promise that resolves with the response body.

```javascript
db.setAdmins('mike') // Set admins.names to ['mike'] and admins.roles to []

db.setAdmins(null, 'webmaster') // Set admin.names to [] and admins.roles to ['webmaster']

db.setAdmins(
  ['john', 'jane'], // Set admins.names to ['john', 'jane']
  ['finances', 'human_resources'] // Set admins.roles to ['finances', 'human_resources']
)

db.setAdmins({
  names: 'mike', // Set admins.names to ['mike']
  roles: ['finances', 'stock'] // Set admins.roles to ['finances', 'stock']
})

db.setAdmins({
  roles: 'webamster' // Set admins.roles to ['webmaster'] and admins.names to []
})
```

### db.addMembers(names, roles)

* **Arguments**:
  * **names**: It can be a `String`, an `Array` of strings, an `Object` or `null`.
  * **roles**: It can be a `String`, an `Array` of strings  or `null`.
* **Returns**: A promise that resolves with the response body.

```javascript
db.addMembers('mike') // Add mike to members.names

db.addMembers(null, 'webmaster') // Add webmaster to members.roles

db.addMembers(
  ['john', 'jane'], // Add john and jane to members.names
  ['finances', 'human_resources'] // Add finances and human_resources to members.roles
)

db.addMembers({
  names: 'mike', // Add mike to members.names
  roles: ['finances', 'stock'] // Add finances and stock to members.roles
})

db.addMembers({
  roles: 'webamster' // Add webmaster to members.roles
})
```

### db.removeMembers(names, roles)

* **Arguments**:
  * **names**: It can be a `String`, an `Array` of strings, an `Object` or `null`.
  * **roles**: It can be a `String`, an `Array` of strings  or `null`.
* **Returns**: A promise that resolves with the response body.

```javascript
db.removeMembers('mike') // Remove mike from members.names

db.removeMembers(null, 'webmaster') // Remove webmaster from members.roles

db.removeMembers(
  ['john', 'jane'], // Remove john and jane from members.names
  ['finances', 'human_resources'] // Remove finances and human_resources from members.roles
)

db.removeMembers({
  names: 'mike', // Remove mike from members.names
  roles: ['finances', 'stock'] // Remove finances and stock from members.roles
})

db.removeMembers({
  roles: 'webamster' // Remove webmaster from members.roles
})
```

### db.setMembers(names, roles)

This method completely replace the `members.names` **AND** `members.roles` lists.

* **Arguments**:
  * **names**: It can be a `String`, an `Array` of strings, an `Object` or `null`.
  * **roles**: It can be a `String`, an `Array` of strings  or `null`.
* **Returns**: A promise that resolves with the response body.

```javascript
db.setMembers('mike') // Set members.names to ['mike'] and members.roles to []

db.setMembers(null, 'webmaster') // Set admin.names to [] and members.roles to ['webmaster']

db.setMembers(
  ['john', 'jane'], // Set members.names to ['john', 'jane']
  ['finances', 'human_resources'] // Set members.roles to ['finances', 'human_resources']
)

db.setMembers({
  names: 'mike', // Set members.names to ['mike']
  roles: ['finances', 'stock'] // Set members.roles to ['finances', 'stock']
})

db.setMembers({
  roles: 'webamster' // Set members.roles to ['webmaster'] and members.names to []
})
```

### db.addNames(names, groups)

* **Arguments**:
  * **names**: It can be a `String` or an `Array` of strings.
  * **groups**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.addNames('mike', 'admins') // Add mike to admins.names

db.addNames(['john', 'jane'], 'members') // Add john and jane to members.names

db.addNames(
  ['john', 'jane'], // Add john and jane
  ['admins', 'members'] // to admins.names and members.names
)
```

### db.removeNames(names, groups)

* **Arguments**:
  * **names**: It can be a `String` or an `Array` of strings.
  * **groups**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.removeNames('mike', 'admins') // Remove mike from admins.names

db.removeNames(['john', 'jane'], 'members') // Remove john and jane from members.names

db.removeNames(
  ['john', 'jane'], // Remove john and jane
  ['admins', 'members'] // from admins.names and members.names
)
```

### db.setNames(names, groups)

* **Arguments**:
  * **names**: It can be a `String` or an `Array` of strings.
  * **groups**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.setNames('finances', 'admins') // Set admins.names to ['finances']

db.setNames(['human_resources', 'stock'], 'members') // Set members.names to ['human_resources', 'stock']

db.setNames(
  ['webmaster', 'sales'], // Set admins.names and members.names
  ['admins', 'members'] // to ['webmaster', 'sales']
)
```

### db.addRoles(roles, groups)

* **Arguments**:
  * **roles**: It can be a `String` or an `Array` of strings.
  * **groups**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.addRoles('finances', 'admins') // Add finances to admins.roles

db.addRoles(['human_resources', 'stock'], 'members') // Add human_resources and stock to members.roles

db.addRoles(
  ['webmaster', 'sales'], // Add webmaster and sales
  ['admins', 'members'] // to admins.roles and members.roles
)
```

### db.removeRoles(roles, groups)

* **Arguments**:
  * **roles**: It can be a `String` or an `Array` of strings.
  * **groups**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.removeRoles('finances', 'admins') // Remove finances from admins.roles

db.removeRoles(['human_resources', 'stock'], 'members') // Remove human_resources and stock from members.roles

db.removeRoles(
  ['webmaster', 'sales'], // Remove webmaster and sales
  ['admins', 'members'] // from admins.roles and members.roles
)
```

### db.setRoles(roles, groups)

* **Arguments**:
  * **roles**: It can be a `String` or an `Array` of strings.
  * **groups**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.setRoles('finances', 'admins') // Set admins.roles to ['finances']

db.setRoles(['human_resources', 'stock'], 'members') // Set members.roles to ['human_resources', 'stock']

db.setRoles(
  ['webmaster', 'sales'], // Set admins.roles and members.roles
  ['admins', 'members'] // to ['webmaster', 'sales']
)
```

### db.addOwners(names)

* **Arguments**:
  * **names**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.addOwners('joey') // Add joey to admins.names and members.names

db.addOwners(['ted', 'rick']) // Add ted and rick to admins.names and members.names
```

### db.removeOwners(names)

* **Arguments**:
  * **names**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.removeOwners('joey') // Remove joey from admins.names and members.names

db.removeOwners(['ted', 'rick']) // Remove ted and rick from admins.names and members.names
```

### db.setOwners(names)

This method completely replace the `admins.names` **AND** `members.names` lists.

* **Arguments**:
  * **names**: It can be a `String` or an `Array` of strings.
* **Returns**: A promise that resolves with the response body.

```javascript
db.setOwners('joey') // Set admins.names and members.names to ['joey']

db.setOwners(['ted', 'rick']) // Set admins.names and members.names to ['ted', 'rick']
```

## License

This software is provided free of charge and without restriction under the [MIT License](/LICENSE)
