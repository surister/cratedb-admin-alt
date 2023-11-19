import queries from "@/store/http/queries";

export class Users {
    users = []

    get_or_create(name, is_superuser) {
        let user = this.users.filter((user) => user.name === name)[0]
        let created = false

        if (user == null) {
            user = new User(name, is_superuser)
            created = true
        }

        return [created, user]
    }

  remove_user(user_name) {
    const user = this.users.filter((user) => user.name === user_name)[0]
    const user_index = this.users.indexOf(user)
    this.users.splice(user_index, 1)
  }
    constructor(data) {
        for (const [i, datum] of data.entries()) {
            const name = datum[0]
            const is_superuser = datum[1]

            const privilege = new Privilege(
                i,
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
            if (privilege.type) {
                user.privileges.push(privilege)
            }
        }
    }
}

export class User {
    privileges = []

    constructor(name, is_superuser) {
        this.name = name
        this.is_superuser = is_superuser
    }

    privileges_to_items() {
        return this.privileges.map((privilege) => {
            return {
                id: privilege.id,
                class_: privilege.class_,
                grantor: privilege.grantor,
                ident: privilege.ident,
                state: privilege.state,
                type: privilege.type
            }
        })
    }
}


export class Privilege {
    constructor(id, class_, grantee, grantor, ident, state, type) {
        this.id = id
        this.class_ = class_
        this.grantee = grantee
        this.grantor = grantor
        this.ident = ident
        this.state = state
        this.type = type
    }
}
