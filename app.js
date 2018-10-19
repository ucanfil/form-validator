// Listens for Dom content has been completely loaded and parsed
// Wrapping all functions with this listener prevents errors as we
// are gonna retrieve data from the DOM.
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(e) {
        validate(e)
    })

    /**
     * Function validates the whole form
     *
     * @param event e, event object
     */
    function validate(e) {
        // If any potential error messages exist on the page, remove them
        document.querySelectorAll('.error').forEach(function(error) {
            error.parentNode.removeChild(error)
        })
        // Declared an empty object that will hold form elements.
        var formElements = {}
        // Setting radio property in formElements object whether it's been checked or not
        formElements["radio"] = document.querySelector('input[type="radio"]').checked
        // Looping over NodeList of text inputs and assign their values as properties of formElements object
        document.querySelectorAll('input[type="text"]').forEach(function(item, i) {
          formElements[i] = item
        })
        // If form field doesn't meet requirements adds required class, removes valid class, prevents form to be submitted
        if (formElements['0'].value.length == 0) {
            addRequiredRemoveValid(formElements, '0')
            insertErrorHtml(formElements, '0', '** Required field')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '0')
        }

        if (formElements['1'].value.length > 8) {
            addRequiredRemoveValid(formElements, '1')
            insertErrorHtml(formElements, '1', '** Max 8 characters')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '1')
        }

        if (!(formElements['2'].value.length >= 10 && formElements['2'].value.length <= 25)) {
            addRequiredRemoveValid(formElements, '2')
            insertErrorHtml(formElements, '2', '** Min 10 - Max 25 characters')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '2')
        }

        if (formElements['3'].value.length > 0 && !(formElements['3'].value.length >= 10 && formElements['3'].value.length <= 25)) {
            addRequiredRemoveValid(formElements, '3')
            insertErrorHtml(formElements, '3', '** Min 10 - Max 25 characters')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '3')
        }

        var lettersOnlyRegex = /^[a-z]+$/i
        // Tests the given input value against lettersOnlyRegex, returns boolean
        if (!lettersOnlyRegex.test(formElements['4'].value)) {
            addRequiredRemoveValid(formElements, '4')
            insertErrorHtml(formElements, '4', '** Letters Only')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '4')
        }

        if (formElements.radio && formElements['5'].value.length == 0) {
            addRequiredRemoveValid(formElements, '5')
            insertErrorHtml(formElements, '5', '** Required field')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '5')
        }

        var validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!validEmailRegex.test(formElements['6'].value)) {
            addRequiredRemoveValid(formElements, '6')
            insertErrorHtml(formElements, '6', '** Please Type a Valid Email')
            e.preventDefault()
        } else {
            addValidRemoveRequired(formElements, '6')
        }
    }

    /**
     * Function adds valid class, removes required class of an element
     *
     * @param object formElements, object properties that will be selected from
     * @param property objectProp, a particular element desired to be manipulated
     */
    function addValidRemoveRequired(formElements, objectProp) {
        formElements[objectProp].classList.add('valid')
        formElements[objectProp].classList.remove('required')
    }

    /**
     * Function adds required class, removes valid class of an element
     *
     * @param object formElements, object properties that will be selected from
     * @param property objectProp, a particular element desired to be
     * manipulated
     */
    function addRequiredRemoveValid(formElements, objectProp) {
        formElements[objectProp].classList.add('required')
        formElements[objectProp].classList.remove('valid')
    }

    /**
     *  Function inserts an error HTML after a DOM element
     *
     * @param object formElements, object properties that will be selected from
     * @param property objectProp, a particular element we'd like to insertHTML * afterwards
     * @param string message, the error message you'd like to insert
     */
    function insertErrorHtml(formElements, objectProp, message) {
        formElements[objectProp].insertAdjacentHTML('afterend', '<h5 class="error">' + message + '</h5>')
    }
})