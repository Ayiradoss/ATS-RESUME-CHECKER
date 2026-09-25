function Navbar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <header className="navbar">

            <div>

                <p className="navbar-page">
                    Dashboard
                </p>

                <p className="navbar-subtitle">
                    Track and improve your resume performance
                </p>

            </div>

            <div className="navbar-user">

                <div className="user-avatar">
                    {user?.fullName
                        ? user.fullName.charAt(0).toUpperCase()
                        : "U"}
                </div>

                <div className="user-info">

                    <strong>
                        {user?.fullName || "User"}
                    </strong>

                    <span>
                        {user?.email || ""}
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Navbar;