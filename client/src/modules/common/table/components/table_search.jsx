const React = require('react'),
    Component = require('modules/lib/component'),
    _ = require('underscore')

class TableSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {search: ''}
    }

    componentDidMount() {
        // The debounce method can only be called once or debouncing doesn't work
        this.handleSearchChangeDebounce = _.debounce(this.props.onSearchChange, 700)

        this.setState({search: this.props.search})
    }

    handleSearchChange(e){
        e.persist() // allow the event to presist through to the
        this.setState({search: e.target.value}, () => {
            // debounce callback
            this.handleSearchChangeDebounce(e)
        })
    }

    render() {

        return (
            <input 
                type="search"
                class={this.props.class || 'form-control'}
                value={this.state.search}
                placeholder={this.props.search_placeholder}
                // Search needs to be an empty string
                // or react complains
                onChange={this.handleSearchChange.bind(this)}
            />
        )
    }
}

TableSearch.defaultProps = {
    onSearchChange: () => {},
    search: '',
    class: ''
}

module.exports = TableSearch