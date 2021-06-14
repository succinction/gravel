const React = require('react'),
    Component = require('modules/lib/component')

class TableLimit extends Component {

    render() {
        return (
            <select class="form-control" value={this.props.limit} onChange={this.props.onLimitChange.bind(this)} >
                {[10, 25, 50, 100, 250, 500].map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
        )
    }
}

TableLimit.defaultProps = {
    onLimitChange: () => {}
}

module.exports = TableLimit
