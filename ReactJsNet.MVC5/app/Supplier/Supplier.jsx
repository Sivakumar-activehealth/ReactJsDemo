

var Supplier = React.createClass({
    getInitialState: function () {
        return { supplierName: '', isReload: false };
    },
    onSupplierChange: function (e) {
        this.setState({ supplierName: e.target.value });
    },
    onSearchFamily: function (e) {
        this.setState({ isReload: true });
        e.preventDefault();
    },
    onBackSearchFamily: function (e) {
        window.location.href = "/Home/Index";
        this.setState({ isReload: true });
        e.preventDefault();
    },
    render: function () {
        return (<div className="supplierFamily">
            <h3>Search suppliers</h3>
            <input type="text" id="txtsearch"
                   value={this.state.supplierName }
                   onChange={this.onSupplierChange  } />&nbsp;
           <input type="button" id="btnsearch" value="Search" onClick={this.onSearchFamily} /> <br /><br />

            { this.props.page == 'supplier' &&

                <div>
                    <input type="button" id="btnsearch" value="Add selected item(s)" />&nbsp;
                    <input type="button" id="btnsearch" value="Done" />
                </div>
            }
             <br/>
            {this.GetSupplier()}
           <input type="button" id="btnback" value="Back" onClick={this.onBackSearchFamily} /> <br />
        </div>
      );
    },
    GetSupplier() {
        return (<SupplierGridTable url="/Supplier/GetSupplierData" name={ this.state.supplierName } />);
    },

});
