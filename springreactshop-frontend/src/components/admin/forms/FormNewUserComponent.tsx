
const FormNewUserComponent = () => {
    return (
        <form className="form" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className="border border-secondary p-2 rounded">
                <div className="form-group row">
                    <label className="col-form-label col-sm-4">E-mail</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            placeholder="Enter E-mail"
                            name="email"
                            className="form-control"
                            onChange={() => { }}
                        />
                    </div>
                </div>

                <div className="mt-2 form-group row">
                    <div className="col-sm-4">
                        <button onClick={() => { }} className="btn btn-success ml-2">Save</button>
                    </div>
                    <div className="col-sm-4">
                        <button onClick={() => { }} className="btn btn-secondary ml-2">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default FormNewUserComponent;