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
            if (privilege.type != null) {
                user.privileges.push(privilege)
            }
        }
    }
}

class User {
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


class Privilege {
    constructor(id, class_, grantee, grantor, ident, state, type) {
        this.id = id
        this.class_ = class_
        this.grantee = grantee
        this.grantor = grantor
        this.ident = ident
        this.state = state
        this.type = type
    }

    get_revoke_stmt() {
        let stmt = queries.REVOKE

        const stmt_replace = {
            '%permission': this.type,
            '%type': this.class_,
            '%ident': this.ident,
            '%to': this.grantee
        }

        Object.entries(stmt_replace).map(entry => {
            stmt = stmt.replace(entry[0], entry[1])
        });
    }
}
