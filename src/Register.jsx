function Register() {

    async function handleRegister(event) {
        event.preventDefault();
        if(event.target[2].value !== event.target[3].value){
            alert('Passwords Don\'t Match');
            return;
        }
        event.target[4].childNodes[1].classList.toggle("d-none")
        event.target[4].classList.toggle("disabled")

        
        let postData = {
            "Name": event.target[0].value,
            "Email": event.target[1].value,
            "Password": event.target[2].value
        }

        try{
            let result = await fetch("http://localhost:5000/api/register",{
                method: "POST",
                mode: "cors",
                body: JSON.stringify(postData),
                headers:{
                    "Content-type": "application/json"
                }
            });
            result = await result.json();
            alert(result.message)
        } catch(e) {
            alert("Something went wrong");
        }
        
        event.target[4].childNodes[1].classList.toggle("d-none")
        event.target[4].classList.toggle("disabled")
    }

    return (
        <div className="container mt-5 py-5">
            <div className="col-12 col-lg-4 offset-lg-4">
                <h1>Register</h1>
                <form className="mt-4" onSubmit={(e) => { handleRegister(e) }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe" required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Secret Password" required minLength={8}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" placeholder="Confirm Secret Password" required minLength={8}></input>
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