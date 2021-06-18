

<div id="modals">
    {this.props.modals && this.props.modals.map((modal, key) => new React.cloneElement(modal, { key: key}))}
</div>
