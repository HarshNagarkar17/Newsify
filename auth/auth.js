$("#loginform").submit(async function (event) {
    event.preventDefault();
    const form = document.getElementById("loginform");
    const errors = document.getElementById("error-message");

    const formData = new FormData(form);
    const data = validateForm(formData)
    if (data) {
        const result = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        }).then((res) => res.json());

        if (result.status == '200')
            window.location.href = 'http://localhost:8080/home'
        else
            errors.innerHTML = result.msg;
    } else {
        errors.innerHTML = 'Invalid data';
        setTimeout(() => { errors.innerHTML = '' }, 3000);
    }
});

function checkPasswordStrength(password) {
    let strengthScore = 0;
    let tips = [];

    if (password.length < 8)
        tips += { msg: "password must be 8 characters long" }
    else
        strengthScore++;

    if (password.match(/[a-z]/) && password.match(/[A-Z]/))
        strengthScore++;
    else
        tips += { msg: "Use both lowercase and uppercase letters. " }

    if (password.match(/\d/))
        strengthScore++;
    else
        tips += { msg: "Use atleast one number " }

    if (password.match(/[^a-zA-Z\d]/))
        strengthScore++;
    else
        tips += { msg: "Include atleast one special character" }


    if (tips.length > 0)
        return false
    return true
}

$("#registerForm").submit(async function (event) {
    event.preventDefault();

    const form = document.getElementById("registerForm");
    const errors = document.getElementById('error-message');
    const formData = new FormData(form);
    const data = validateForm(formData);
    if (data) {
        errors.innerHTML = '';  // if there was already an error showing
        if (checkPasswordStrength(data.password)) {
            console.log('password');
            const result = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data })
            }).then((res) => res.json());

            if (result.status == '200')
                window.location.href = 'http://localhost:8080/home';
            else if (result.status == '422')
                errors.innerHTML = result.msg;
            // console.log('ersult', result);
        } else {
            errors.innerHTML = 'Password is weak';
            setTimeout(() => { errors.innerHTML = '' }, 3000);
        }
    } else {
        errors.innerHTML = 'Invalid Email Id';
        setTimeout(() => { errors.innerHTML = '' }, 3000);
    }
})


function validateForm(form) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let data = {};
    for (const [key, value] of form.entries()) {
        if (key === 'email') {
            if (!emailRegex.test(value))
                return 0;
        }
        if ((key === 'email' && value === '') || (key === 'password' && value === ''))
            return 0

        data[key] = value;
    }
    return data;
}