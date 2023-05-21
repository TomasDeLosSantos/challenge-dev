import { useContext } from "react";
import { Context } from "./AccountContext";

const TestComponent = () => {
    const contextValues = useContext(Context);
    return (
        <div>
            <b>{contextValues.pages}</b>
            {contextValues.accounts.length > 0 ? contextValues.accounts.map(a => <b key={a.id}>account</b>) : <b>no accounts</b>}
            {contextValues.accountsPerPage.length > 0 ? contextValues.accountsPerPage.map(a => <b key={a[0].id + 100}>page</b>) : <b>no pages</b>}
        </div>
    );
}

export default TestComponent;