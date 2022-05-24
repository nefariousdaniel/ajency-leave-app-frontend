function Register() {

    async function handleRegister(event) {
        event.target[4].childNodes[1].classList.toggle("d-none")
        event.target[4].classList.toggle("disabled")
        event.preventDefault();

        let postData = {
            email: event.target[0].value,
            password: event.target[1].value
        }
    }

    return (
        <div className="container mt-5 py-5">
            <div className="col-12 col-lg-4 offset-lg-4">
                <h1>Register</h1>
                <form className="mt-4" onSubmit={(e) => { handleRegister(e) }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Secret Password"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" placeholder="Confirm Secret Password"></input>
                    </div>

                    <button type="submit" className="btn btn-primary mb-3">
                        <span>Register</span>
                        <span className="spinner-border spinner-border-sm text-light ms-2 d-none"></span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register