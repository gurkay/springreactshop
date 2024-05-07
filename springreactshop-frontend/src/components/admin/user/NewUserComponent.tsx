import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate, useParams } from "react-router-dom";

const NewUserComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUser = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const userId = useParams();
    
    return(
        <div className="card">
            <h3 className="text-center"></h3>
        </div>
    );
}

export default NewUserComponent;