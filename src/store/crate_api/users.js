import queries from "@/store/http/queries";

export class Users {
    users = []

  remove_user(user_name) {
    const user = this.users.filter((user) => user.name === user_name)[0]
    const user_index = this.users.indexOf(user)
    this.users.splice(user_index, 1)
  }

    constructor(data) {
        for (const datum of data) {
            const name = datum[0]
            const is_superuser = datum[1]
            const privileges = datum[2]

            const new_user = new User(name, is_superuser)

            for (const [i, privilege] of privileges.entries()) {
                const new_privilege = new Privilege(i, ...Object.values(privilege))
                new_user.privileges.push(new_privilege)
            }
            this.users.push(new_user)
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
    constructor(id, class_, grantor, ident, state, type) {
        this.id = id
        this.class_ = class_
        this.grantor = grantor
        this.ident = ident
        this.state = state
        this.type = type
    }
}
