'use client'

export default () => {

    const handleUserLogin = () => {
  
    }
    const handleOfficialLogin = () => {
  
    }
    return (
        <section className="login-container">
            <div className="login-container">
                <div className="login-box">
                    <h2>User Login</h2>
                    <form id="userLoginForm" onSubmit={handleUserLogin(event)}>
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <div className="spacer"></div>
                        <button type="submit" className="button">
                            <i className="fas fa-sign-in-alt"></i>
                            Login
                        </button>
                        <p>New User? <a href="register.html">Register</a></p>
                        <p className="forgot-password">
                            <a href="forgot-password.html">Forgot Password?</a>
                        </p>
                    </form>
                </div>

                <div className="login-box">
                    <h2>Official Login</h2>
                    <form id="officialLoginForm" onSubmit={handleOfficialLogin(event)}>
                        <input type="text" placeholder="Official ID" name="officialId" required />
                        <select name="role" required>
                            <option value="">Select Role</option>
                            <option value="ministryofwelfare">Ministry of Welfare</option>
                            <option value="district_collector">District Collector</option>
                            <option value="jointcollector">Joint Collector</option>
                            <option value="revenuedepartmentofficer">
                                Revenue Department Officer
                            </option>
                            <option value="revenueinspector">Revenue Inspector</option>
                            <option value="vro">VRO (Village Revenue Officer)</option>
                            <option value="mro">MRO (Mandal Revenue Officer)</option>
                            <option value="surveyor">Surveyor</option>
                            <option value="project_officer">Project Officer</option>
                            <option value="superintendent">Superintendent</option>
                            <option value="officer">Officer</option>
                            <option value="clerk">Clerk</option>
                        </select>
                        <input type="password" placeholder="Password" name="password" required />
                        <button type="submit" className="button">
                            <i className="fas fa-user-shield"></i>
                            Login
                        </button>
                        <p>
                            New Official? <a href="officialregistration.html">Register</a>
                        </p>
                        <p className="forgot-password">
                            <a href="forgot-password.html">Forgot Password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}