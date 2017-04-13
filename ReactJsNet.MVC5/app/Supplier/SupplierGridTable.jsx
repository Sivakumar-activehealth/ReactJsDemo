

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

var SupplierGridTable = React.createClass({
   

    getInitialState: function () {
        return {
            supplier: [],
            totalPage: 2,
            sortColumnName: null,
            sortOrder: null,
            currentPage: 1,
            pageSize: 2,
            checkedAll: false,
            isReload: false,
            result: ''
        };
    },
    componentDidMount: function () {

        this.populateData();

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
                this.setState({ supplier: data });
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
    checkRow: function (e) {
        debugger
        var chked = this.state.checkedAll ? false : true;
        this.state.supplier.forEach(function (item) {
            if (item.SupplierId == SupplierId) {
                item.isSelected = chked;
            }
        });
        this.setState({ isReload: true });
    },
  
    componentWillReceiveProps: function (newProps) {
        this.populateData();
    },

    render: function () {
        var rows = [];
        if (this.state.supplier) {
            this.state.supplier.forEach(function (item) {
                rows.push(<SupplierGridRow key={item.SupplierId} item={item}   handleSearch={this.checkRow } />);
            });
            }
        return (<div>

                <table className="table table-responsive table-bordered">
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={this.state.checkedAll} onChange={this.checkAll.bind()} /> </th>
                        <th onClick={this.sortChanged.bind('SupplierId', this.state.sortOrder,this)}>
                            Supplier ID<i className={this._sortClass('SupplierId')}></i>
                        </th>
                           <th onClick={this.sortChanged.bind('SupplierName', this.state.sortOrder,this)}>
                               Supplier Name
                              <i className={this._sortClass('SupplierName')}></i>
                           </th>
                        <th onClick={this.sortChanged.bind('MasterSupplier', this.state.sortOrder, this)}>
                            Master Supplier<i className={this._sortClass('MasterSupplier')}></i>
                        </th>
                        <th onClick={this.sortChanged.bind('MasterStatus', this.state.sortOrder, this)}>
                            Master Status<i className={this._sortClass('MasterStatus')}></i>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                </table>
            <GridPager Size={this.state.totalPage} onPageChanged={this.pageChanged} currentPage={this.state.currentPage} />
        </div>
               );
    }
});