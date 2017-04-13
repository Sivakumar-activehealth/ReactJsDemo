
var App = React.createClass({
    render: function () {
        var Name = window.location.href.split('=')[2];

        if (window.location.href.split('=')[1] == undefined) {
            return (<SupplierFamily />);
        } else if (window.location.href.split('=')[1] != undefined && window.location.href.split('=')[1] == 'supplier') {
            return (<Supplier page='supplier' />)
        } else if (window.location.href.split('=')[1] != undefined && window.location.href.split('=')[1] == 'supplier&name') {
            return (<EditSupplierFamily name={Name } />);
        }
    },
});

ReactDOM.render(
  <App />,
    document.getElementById('content')
);