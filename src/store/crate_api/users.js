export class Users {
    users = []

    get_or_create(name, is_superuser){
        let user = this.users.filter((user) => user.name === name)[0]
        let created = false

        if (user == null){
            user = new User(name, is_superuser)
            created = true
        }

        return [created, user]
    }

    constructor(data) {
        for (const datum of data) {
            const name = datum[0]
            const is_superuser = datum[1]

            const privilege = new Privilege(
                datum[2],
                datum[3],
                datum[4],
                datum[5],
                datum[6],
                datum[7],
            )
            const [created, user] = this.get_or_create(name, is_superuser)

            if (created) {
                this.users.push(user)
            }
            if (privilege.type != null) {
                user.privileges.push(privilege)
            }
        }
    }
}

class User {
  privileges = []
  constructor(name, is_superuser){
    this.name = name
    this.is_superuser = is_superuser
  }
}


class Privilege {
    constructor(class_, grantee, grantor, ident, state, type) {
        this.class_ = class_
        this.grantee = grantee
        this.grantor = grantor
        this.ident = ident
        this.state = state
        this.type = type
    }
}
