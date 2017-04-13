


var FamilyGridTable = React.createClass({

    getInitialState: function () {
        return {
            family: [],
            totalPage: 2,
            sortColumnName: null,
            sortOrder: null,
            currentPage: 1,
            pageSize: 2,
            checkedAll: false,
            isReload: false
        };
    },
    componentDidMount: function () {

        this.populateData();
    },
    componentWillReceiveProps: function (newProps) {
        $.ajax({
            url: newProps.url,
            dataType: 'json',
            data: { name: newProps.name },
            success: function (data) {
                this.setState({ family: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    populateData: function () {
        var params = {
            pageSize: this.state.pageSize,
            currentPage: this.state.currentPage,
            name: this.props.name
        }
        if (this.state.sortColumnName) {
            params.sortColumnName = this.state.sortColumnName;
        }
        if (this.state.sortOrder) {
            params.sortOrder = this.state.sortOrder;
        }

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            data: params,
            success: function (data) {
                this.setState({ family: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    pageChanged: function (pageNumber, e) {
        e.preventDefault();
        this.state.currentPage = pageNumber;
        this.populateData();
    },

    sortChanged: function (sortColumnName, order, e) {
        e.preventDefault();
        this.state.sortColumnName = sortColumnName;
        this.state.currentPage = 1;
        this.state.sortOrder = order.toString().toLowerCase() == 'asc' ? 'desc' : 'asc';
        this.populateData();
    },

    _sortClass: function (filterName) {
        return "fa fa-fw " + ((filterName == this.state.sortColumnName) ? ("fa-sort-" + this.state.sortOrder) : "fa-sort");
    },

    checkAll: function () {
        var chked = this.state.checkedAll ? false : true;
        this.state.supplier.forEach(function (item) {
            item.isSelected = chked;
        });
        this.setState({ checkedAll: chked ? true : false });
    },
    checkRow: function (SupplierId, value) {
        var chked = this.state.checkedAll ? false : true;
        this.state.supplier.forEach(function (item) {
            if (item.SupplierId == SupplierId) {
                item.isSelected = chked;
            }
        });
        this.setState({ isReload: true });
    },

    render: function () {

        var rows = [];
        if (this.state.family) {
            this.state.family.forEach(function (item) {
                rows.push(<FamilyGridRow key={item.Id} item={item } />);
            });
            }
        return (
                <div>
                <table className="table table-responsive table-bordered">
                <thead>
                    <tr>
                         <th onClick={this.sortChanged.bind('Name', this.state.sortOrder,this)}>
                             Name<i className={this._sortClass('Name')}></i>
                         </th>
                          <th onClick={this.sortChanged.bind('Address', this.state.sortOrder, this)}>
                              Address<i className={this._sortClass('Address')}></i>
                          </th>
                         <th onClick={this.sortChanged.bind('Address', this.state.sortOrder, this)}>
                             Email<i className={this._sortClass('Email')}></i>
                         </th>
                        <th onClick={this.sortChanged.bind('Mobile', this.state.sortOrder, this)}>
                            Mobile<i className={this._sortClass('Mobile')}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                </table>
    <GridPager Size={this.state.totalPage} onPageChanged={this.pageChanged} currentPage={this.state.currentPage} />

                </div>);
    }
});

var GridPager = React.createClass({
    render: function () {
        var li = [];
        var pageCount = this.props.Size;
        for (var i = 1; i <= pageCount; i++) {
            if (this.props.currentPage == i) {
                li.push(<li key={i} className="active"><a href="#">{i}</a></li>);
            }
            else {
                li.push(<li key={i }><a href="#" onClick={this.props.onPageChanged.bind(null, i) }>{i}</a></li>);
            }
        }
        return (<ul className="pagination">{li}</ul>);
    }
});
