const $inputs = document.querySelectorAll('input[type="text"]')
const $button = document.querySelector('button')
const $label = document.querySelector('body div > div label')

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
        $input.classList = ''
        $label.classList = ''
        $label.innerText = ''
    })
})

$button.addEventListener('click', () => {
    const formData = new FormData()
    const code = parseInt([...$inputs].map($input => $input.value).join('')) || null
    const action = window.location.pathname.replace('index.html', '').slice(0, -1).split('/')
    console.log(action)
    formData.append('code', code)
    formData.append('action', action[action.length - 1])
    fetch(
        'https://megaborodun4ik.monster/api/v1/birthday_quiz/',
        {
            method: 'POST',
            body: formData
        }
    )
        .then(response => response.json())
        .then(data => {
            $inputs.forEach(($input, key) => {
                data.status = JSON.parse(data.status)
                $input.classList.add(`${data.status ? '' : 'in'}valid`)
            })
            $label.classList.add(`${data.status ? '' : 'in'}valid`)
            $label.innerText = `${data.status ? '' : 'не '}верно`
        })
        .catch(error => {
            console.error('Error:', error)
        })
})