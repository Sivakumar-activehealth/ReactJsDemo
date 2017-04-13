
var SupplierGridRow = React.createClass({
    propTypes: {
       
        handleSearch: React.PropTypes.func
    },
    render: function () {
        return (
            <tr className="supplierGridRow">
                <td> <input type="checkbox"  checked={this.props.item.isSelected}  onChange={this.onChange} /> </td>
                <td>{this.props.item.SupplierId}</td>
                <td>{this.props.item.SupplierName}</td>
                <td>{this.props.item.MasterSupplier}</td>
                <td>{this.props.item.SupplierStatus}</td>
            </tr>
        );
    },
    
    onChange: function () {
        //this.props.handleSearch();
    },

});