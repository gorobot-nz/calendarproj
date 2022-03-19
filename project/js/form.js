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
        label.innerHTML = 'Details'

        const input = document.createElement('textarea')
        input.id = 'details'
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

    renderForm(type) {
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

        const submitButton = document.createElement('input')
        submitButton.className = 'wide-btn'
        submitButton.type = 'submit'
        submitButton.value = 'Send'

        form.appendChild(submitButton)
        return form
    }
}