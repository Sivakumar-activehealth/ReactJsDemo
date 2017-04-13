var AddFamily = React.createClass({

    getInitialState: function () {
        return { familyName: '', isReload: false };
    },

    onFamilyNameChange: function (e) {
        this.setState({ familyName: e.target.value });
    },
    onSupplierNav: function (e) {
        window.location.href = "/Home/Index";
        e.preventDefault();
    },
    onFamilySave: function (e) {
        alert(this.state.familyName +" saved success");
    },
    render: function () {

        return (<div>
                    <h3>Add supplier family</h3><br /> <br />
                    <input type="text" value={this.state.familyName} onChange={this.onFamilyNameChange } />&nbsp;
                    <input type="button" value="Save" onClick={this.onFamilySave } />                    <br />    <br />
                    <input type="button" value="Back" onClick={this.onSupplierNav } />
        </div>);
    }
});