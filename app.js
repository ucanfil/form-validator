// document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form')
    form.addEventListener('submit', function(e) {
        // If any potential error messages are on the page, remove them
        document.querySelectorAll('.error').forEach(function(error) {
            error.parentNode.removeChild(error)
        })
        validate(e)
    })

    function validate(e) {
        var formElements = {}
        formElements["radio"] = document.querySelector('input[type="radio"]').checked
        document.querySelectorAll('input[type="text"]').forEach(function(item, i) {
          formElements[i] = item
        })
        if (formElements['0'].value.length == 0) {
            formElements['0'].classList.add('required')
            formElements['0'].classList.remove('valid')
            formElements['0'].insertAdjacentHTML('afterend', '<h5 class="error">** Required field</h5>')
            e.preventDefault()
        } else {
            formElements['0'].classList.add('valid')
            formElements['0'].classList.remove('required')
        }

        if (formElements['1'].value.length > 8) {
            formElements['1'].classList.add('required')
            formElements['1'].classList.remove('valid')
            formElements['1'].insertAdjacentHTML('afterend', '<h5 class="error">** Max 8 characters</h5>')
            e.preventDefault()
        } else {
            formElements['1'].classList.add('valid')
            formElements['1'].classList.remove('required')
        }

        if (!(formElements['2'].value.length >= 10 && formElements['2'].value.length <= 25)) {
            formElements['2'].classList.add('required')
            formElements['2'].classList.remove('valid')
            formElements['2'].insertAdjacentHTML('afterend', '<h5 class="error">** Min 10 - Max 25 characters</h5>')
            e.preventDefault()
        } else {
            formElements['2'].classList.add('valid')
            formElements['2'].classList.remove('required')
        }
    }

// })