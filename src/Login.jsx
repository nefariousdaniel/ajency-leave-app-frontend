import { useNavigate } from "react-router-dom";

function Login() {

    let navigate = useNavigate();

    async function handleLogin(event){
        event.target[2].childNodes[1].classList.toggle("d-none")
        event.target[2].setAttribute("disabled","")
        event.preventDefault();

        let postData = {
            email: event.target[0].value,
            password: event.target[1].value
        }

        var response = await fetch("http://localhost:5000/api/login",{
            mode: 'cors',
            body:JSON.stringify(postData),
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            }
        });
        event.target[2].childNodes[1].classList.toggle("d-none")
        event.target[2].removeAttribute("disabled","")
        if(response.status === 200){
            response = await response.json();
            sessionStorage.setItem("token",response.token)
            sessionStorage.setItem("user",JSON.stringify(response.data.fields));
            navigate("/");
            return;
        }
        alert("Something Went Horribly Wrong");
        return;
        
    }

    return (
        <div className="container mt-5 py-5">
            <div className="col-12 col-lg-4 offset-lg-4">
                <h1>Login</h1>
                <form className="mt-4" onSubmit={(e)=>{handleLogin(e)}}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" required className="form-control" id="email" placeholder="name@example.com"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" required className="form-control" id="password" placeholder="Secret Password"></input>
                    </div>

                    <button type="submit" className="btn btn-primary mb-3">
                        <span>Login</span>
                        <span className="spinner-border spinner-border-sm text-light ms-2 d-none"></span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login