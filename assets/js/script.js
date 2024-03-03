const $inputs = document.querySelectorAll('input[type="text"]')
const $button = document.querySelector('button')

$inputs.forEach(($input, key) => {
    $input.addEventListener('input', event => {
        if ($input.value.length === 0) {
            if ($inputs[key - 1]) {
                $inputs[key - 1].focus()
            }
        } else {
            $input.value = $input.value.slice(0, 1)
        }
        if ($input.value.length === 1) {
            if ($inputs[key + 1]) {
                $inputs[key + 1].focus()
            } else {
                $input.blur()
            }
        }
    })
    $input.addEventListener('focus', () => {
        $input.selectionStart = 0
    })
})

$button.addEventListener('click', () => {
    const formData = new FormData()
    const code = parseInt([...$inputs].map($input => $input.value).join(''))
    const action = 'megaborodun4ik'
    // const action = window.location.pathname.slice(0, -1).split('/')[3]
    formData.append('code', code)
    formData.append('action', action)
    fetch(
        'https://megaborodun4ik.monster/api/v1/birthday_quiz/',
        {
            method: 'POST',
            body: formData
        }
    )
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Error:', error)
        })
})