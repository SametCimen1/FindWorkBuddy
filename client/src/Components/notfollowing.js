export default function NotFollowing({user}){
  return(
    <div>
    <img  src  = {user.user.image}/>
        <h2>{user.user.name}</h2>
        <h2>{user.user.email}</h2>
        <h2>{user.user.friendnum}</h2>
        <h2>{user.user.role}</h2>
        <button>follow</button>
    </div>
  )
}