var SupplierFamily = React.createClass({

    getInitialState: function () {
        return { supplierName: '', isReload: false, showAdd: false };
    },

    onSupplierChange: function (e) {
        this.setState({ supplierName: e.target.value });
    },

    onSearchFamily: function (e) {
        this.setState({ isReload: true });
        e.preventDefault();
    },

    onAddFamily: function (e) {
        this.setState({ showAdd: true });
        e.preventDefault();
    },

    render: function () {
        if (!this.state.showAdd) {
            return (<div className="supplierFamily">
                <h3>Supplier family</h3>
                <input type="button" id="btnadd" value="Add new family" onClick={ this.onAddFamily } /><br />   <br />
                <span>Supplier family name:</span><br />

                <input type="text" id="txtsearch" 
                       value={this.state.supplierName}
                       onChange={this.onSupplierChange
            } />
               <input type="button" id="btnsearch" value="Search" onClick={this.onSearchFamily } /> <br /><br />
                {this.GetFamily()}
            </div>);
        }
        if (this.state.showAdd) {
          return(<AddFamily />)
        }
    },

    GetFamily() {
        return (<FamilyGridTable url="/home/GetFamilyData" name={ this.state.supplierName } />);
    },

});
