import '../styles/profileStyle.css';

export default function Profile(){
    return(
        <div>
            <div className = "imgContainer">
               
                    <div className = "imgInforContainer">{/*flex space-between*/}
                        <img src = "https://upload.wikimedia.org/wikipedia/mediawiki/a/a9/Example.jpg" className = "profileImg"></img>
                        <div className = "name"> {/*flex*/}
                            <h2>iarhabib5</h2>
                            <h4>admin</h4> {/*show only if user is admin*/}
                        </div>
                        <div className = "followers"> {/*flex*/}
                            <h2>0 followers</h2> {/* followers */}
                            <h2>0 following</h2> {/* followers */}
                        </div>
                    </div>
                <div className = "editProfile">
                    <button>Edit Profile</button>
                </div>
            </div>

        </div>
    )
}