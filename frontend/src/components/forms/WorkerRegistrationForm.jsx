
export default function WorkerRegistrationForm() {

   

  return (
    <form>
      <div className="container mt-5 mb-5 border border-dark rounded ">
        <div className="mt-3 mb-5 display-5 text-center">
          WORKER REGISTRATION
        </div>
        {/*  1st row*/}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idfname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idfname"
                placeholder="Mark"
              />
              <span className="error text-danger"> </span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idlname" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idmname"
                placeholder="Zuckerberg"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idlname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="idlname"
                placeholder="Zuckerberg"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col-md-2">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="idfname" className="form-label">
                Gender
              </label>
              <select className="form-select">
                <option value="0">Choose</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
              <span className="error text-danger"></span>
            </div>
          </div>
        </div>

        <hr />

        {/* 2st row*/}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="uid"
                placeholder="Enter your username"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter your password"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="telno"
                placeholder="Enter your password" maxLength={10}
              />
              <span className="error text-danger"></span>
            </div>
          </div>
        </div>

        <hr />

        {/* 4th row */}

        <div className="row">

        <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Education
              </label>
              <select className="form-select">
                <option value="0">Choose</option>
                <option value="1">X</option>
                <option value="2">XII</option>
                <option value="3">Graduation</option>
                <option value="3">Other</option>
              </select>
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Open to Relocation
              </label>
              <select className="form-select">
                <option value="0">Choose</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Security Question
              </label>
              <select className="form-select">
                <option value="0">Choose</option>
                <option value="1">Que1</option>
                <option value="2">Que1</option>
                <option value="3">Que1</option>
                <option value="3">Que1</option>
                <option value="3">Que1</option>
              </select>
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Answer
              </label>
              <input
                type="password"
                className="form-control"
                id="add2"
                placeholder="Enter your Answer"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

        </div>

        {/* 4rd row */}
        <div className="row">
          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="sid"
                placeholder="Enter your state"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                City
              </label>
              <input
                type="password"
                className="form-control"
                id="cid"
                placeholder="Enter your city"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Address Line1
              </label>
              <input
                type="password"
                className="form-control"
                id="add1"
                placeholder="Enter house number and name"
              />
              <span className="error text-danger"></span>
            </div>
          </div>

          <div className="col">
            <div className="mb-3 border bg-light rounded p-2">
              <label htmlFor="pwd" className="form-label">
                Address Line2
              </label>
              <input
                type="password"
                className="form-control"
                id="add2"
                placeholder="Enter your Area"
              />
              <span className="error text-danger"></span>
            </div>
          </div>
        </div>

        <hr />

        {/* 5th row */}
        <div className="row text-center m-3">
          <div className="col">
            <button className="btn btn-primary col-6" type="submit">
              Register
            </button>
          </div>
          <div className="col">
            <button className="btn btn-outline-danger col-6" type="reset">
              Clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
