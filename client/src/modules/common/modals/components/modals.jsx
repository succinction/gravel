const React = require('react')

module.exports = class Modals extends React.Component {
    render() {
        return (
            <div id="modals">
                {this.props.modals && this.props.modals.map((modal, key) => new React.cloneElement(modal, { key: key}))}
            </div>
        )
    }
}