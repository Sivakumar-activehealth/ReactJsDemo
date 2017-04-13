
var FamilyGridRow = React.createClass({

    render: function () {
        return (
            <tr className="familyGridRow">
                <td><a href="#" onClick={this.onSupplierNav.bind(this.props.item.Name) }>{this.props.item.Name}</a> </td>
                <td>{this.props.item.Address}</td>
                <td>{this.props.item.Email}</td>
                <td>{this.props.item.Mobile}</td>
            </tr>
        );
    },
    onSupplierNav: function (e) {
        var Name = this.props.item.Name;
        window.location.href = "/supplier/Index?url=supplier&name=" + Name + "";
        e.preventDefault();
    },
});