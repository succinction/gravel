const React = require('react'),
    Component = require('modules/lib/component')

class TablePagination extends Component {

    render() {

        var prev_unavailable = this.props.page == 1 ? 'unavailable' : 'available',
            next_unavailable = this.props.page >= this.props.pages ? 'unavailable' : 'available'

        return (

            <div class="pagination-centered">
                <ul class="pagination">
                    <li class={'arrow ' + prev_unavailable}>
                        <a href="#" onClick={(e) => this.props.onPageChange(e, 'first')}>«</a>
                    </li>
                    <li class={'table-button-prev ' + prev_unavailable}>
                        <a href="#" onClick={(e) => this.props.onPageChange(e, 'previous')}>&lt;</a>
                        </li>
                    <li class="table-info unavailable" >
                        {this.props.pageInfo}
                    </li>
                    <li class={'table-button-next ' + next_unavailable}>
                        <a href="#" onClick={(e) => this.props.onPageChange(e, 'next')}>&gt;</a>
                    </li>
                    <li class={'arrow ' + next_unavailable}>
                        <a href="#" onClick={(e) => this.props.onPageChange(e, 'last')}>»</a>
                    </li>
                </ul>
            </div>
        )
    }
}

TablePagination.defaultProps = {
    onPageChange: () => {},
    page: 1,
    pages: 0,
    limit: 0
}

module.exports = TablePagination