

var Tabs = React.createClass({
    getInitialState: function () {
        var data = [{ title: "General" },
                    { title: "Manage supplier" }];

        return { familyName: this.props.name, activeTab: 0, data: data, };
    },

    getGeneralContent: function () {
        return (<div>
            Name: <br />
            <input type="text" value={this.state.familyName} onChange={this.handleonChange} />
        </div>);
    },

    getMangesupplier: function () {
        return (<div>
            <input type="button" value="Add suppliers" onClick={this.onSupplierNav} />&nbsp;
            <input type="button" value="Remove suppliers" /><br />            <br />
            <SupplierGridTable url="/Supplier/GetSupplierData" name='' />
        </div>);
    },

    handleonChange: function (e) {
        this.setState({ familyName: e.target.value });
        return false;
    },

    handleClick: function (index) {
        this.setState({ activeTab: index });
        return false;
    },

    onSupplierNav: function (e) {
        window.location.href = "/Home/Index?page=supplier";
        e.preventDefault();
    },
    render: function () {
        return (
          <div>
            <dl className="tabs">
                {this.state.data.map(function (tab, index) {
                    var activeClass = this.state.activeTab === index ? 'active' : '';

                    return (
                    <dd className={'tab ' + activeClass}>
                    <a href="#" onClick={this.handleClick.bind(this, index)}>{tab.title}</a>
                    </dd>
              )
                }, this)}
            </dl>
                <div className="tabs-content">
                    {this.state.data.map(function (tab, index) {
                        var activeClass = this.state.activeTab === index ? 'active' : '';
                        return (
                        <div className={'content ' + activeClass}>

                            {tab.title == 'General' &&
                             this.getGeneralContent()
                            }
                            {tab.title == 'Manage supplier' &&
                             this.getMangesupplier()
                            }

                        </div>
                    )
                    }, this)}
                </div>
          </div>
    );
    }
});