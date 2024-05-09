import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserById } from "../../../app/features/userSlice/userCreateAsyncThunk";

const NewUserComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        getUser(Number(userId));
    }, [userId]);

    function getUser(userId: number) {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }

    const pageTitle = () => {
        return userId ? `Edit User` : `Add User`;
    }

    return (
        <div className="card mt-2">
            <h3 className="text-center">{pageTitle()}</h3>
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
        </div>
    );
}

export default NewUserComponent;