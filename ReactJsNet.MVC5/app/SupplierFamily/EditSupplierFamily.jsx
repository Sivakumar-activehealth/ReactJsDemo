var EditSupplierFamily = React.createClass({

    onBackSearchFamily: function (e) {
        window.location.href = "/Home/Index";
        this.setState({ isReload: true });
        e.preventDefault();
    },
    render: function () {
        return (
         <div className="EditSupplierFamily">
         <br />
             <h4>Edit supplier family: {this.props.name}</h4><br />    <br />

            <input type="button" value="Save" />&nbsp;
            <input type="button" value="Cancel" /><br />            <br />
            <Tabs name={this.props.name} />
            <input type="button" id="btnback" value="Back" onClick={this.onBackSearchFamily} /> <br />
         </div>)
    }
});