export default function Signup(){
    return (
        <form>
        <div className = "formContainer">
            <label>Name</label>
            <input type = "text" />
        </div>
        <div className = "formContainer">
            <label>password</label>
            <input type = "password" />
        </div>
      </form>
    )
  }