

export default function LoginForm() {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form className="border border-dark rounded p-4 w-50">
        <h2 className="text-center mb-4">LOGIN</h2>
        <div className="form-group">
          <div className="mb-3 border bg-light rounded p-2">
            <label htmlFor="uid">Email</label>
            <input
              type="text"
              className="form-control"
              id="uid"
              name="uid"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="mb-3 border bg-light rounded p-2">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              name="pwd"
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary w-25 mx-2">Login</button>
          <button type="reset" className="btn btn-outline-danger w-25 mx-2">Clear</button>
        </div>
      </form>
    </div>
  );
}
