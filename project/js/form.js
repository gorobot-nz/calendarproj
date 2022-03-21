class Form {
    constructor(isEdit) {
        this.isEdit = isEdit
    }

    setIsEdit(isEdit) {
        this.isEdit = isEdit
    }

    renderReminderFormPart() {
        const formGroup = document.createElement('div')
        formGroup.className = 'form-group'

        const label = document.createElement('label')
        label.innerHTML = 'Title'

        const input = document.createElement('input')
        input.type = 'text'
        input.id = 'title'
        input.placeholder = 'Title'

        label.htmlFor = input.id

        formGroup.appendChild(label)
        formGroup.appendChild(input)

        return formGroup
    }

    renderTaskFormPart() {
        const formGroup = document.createElement('div')
        formGroup.className = 'form-group'

        const label = document.createElement('label')
        label.innerHTML = 'Description'

        const input = document.createElement('textarea')
        input.id = 'description'
        input.rows = 2
        input.cols = 15

        label.htmlFor = input.id

        formGroup.appendChild(label)
        formGroup.appendChild(input)

        return formGroup
    }

    renderEventFormPart() {
        const formGroup = document.createElement('div')
        formGroup.className = 'form-group'

        const label = document.createElement('label')
        label.innerHTML = 'Period'

        const selector = document.createElement('select')
        selector.id = 'period'

        const trueOption = document.createElement('option')
        trueOption.value = 'true'
        trueOption.innerHTML = 'Yes'

        const falseOption = document.createElement('option')
        falseOption.value = 'false'
        falseOption.innerHTML = 'No'

        selector.appendChild(falseOption)
        selector.appendChild(trueOption)

        label.htmlFor = selector.id

        formGroup.appendChild(label)
        formGroup.appendChild(selector)

        return formGroup
    }

    renderForm(type, render) {
        console.log(this.isEdit)
        const form = document.createElement('form')
        form.className = 'modal-form'
        form.id = 'modal-form'
        form.appendChild(this.renderReminderFormPart())

        if (type !== REMINDER) {
            form.appendChild(this.renderTaskFormPart())

            if (type !== TASK) {
                form.appendChild(this.renderEventFormPart())
            }
        }

        const submitButton = document.createElement('button')
        submitButton.className = 'wide-btn'
        submitButton.innerHTML = `<p>Save</p>`

        form.appendChild(submitButton)

        if (this.isEdit) {
            const deleteButton = document.createElement('button')
            deleteButton.className = 'wide-btn'
            deleteButton.innerHTML = `<p>Delete</p>`

            deleteButton.onclick = async (e) => {
                e.preventDefault()
                const user = localStorage.getItem('user')
                const day = localStorage.getItem('selectedDay')
                const id = localStorage.getItem('id')
                await Firebase.deleteChallenge(user, day, id)
                console.log(this.isEdit)
                await render()
            }
            form.appendChild(deleteButton)
        }

        submitButton.onclick = async (e) => {
            e.preventDefault()
            const date = localStorage.getItem('selectedDay')
            const user = localStorage.getItem('user')

            const title = form.querySelector('#title').value
            const info = { title }

            if (form.querySelector('#description') === null) {
                info['type'] = REMINDER
            } else {
                info['description'] = form.querySelector('#description').value
                if (form.querySelector('#period') === null) {
                    info['type'] = TASK
                } else {
                    info['type'] = EVENT
                    info['period'] = form.querySelector('#period').value
                }
            }

            if (this.isEdit) {
                const id = localStorage.getItem('id')
                await Firebase.putChallenge(user, date, id, info)
            } else {
                await Firebase.postChallenge(user, date, info)
            }
            await render()
        }

        return form
    }

    renderSettingsForm(render) {
        const form = document.createElement('form')
        form.className = 'modal-form'
        form.id = 'modal-form'

        const formGroup = document.createElement('div')
        formGroup.className = 'form-group'

        const label = document.createElement('label')
        label.innerHTML = 'Your name'

        const input = document.createElement('input')
        input.type = 'text'
        input.id = 'name'
        input.placeholder = 'Name'

        label.htmlFor = input.id

        formGroup.appendChild(label)
        formGroup.appendChild(input)

        const submitButton = document.createElement('input')
        submitButton.className = 'wide-btn'
        submitButton.type = 'submit'
        submitButton.value = 'Set user'

        form.appendChild(formGroup)
        form.appendChild(submitButton)

        form.onsubmit = async (event) => {
            event.preventDefault()

            const userName = form.querySelector('#name').value
            localStorage.setItem('user', userName)
            await render()
        }

        return form
    }
}