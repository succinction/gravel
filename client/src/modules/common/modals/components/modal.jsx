const React = require('react'),
    Component = require('modules/lib/component'),
    AlertStore = require('modules/common/alerts/stores/alert_store'),
    ModalStore = require('modules/common/modals/stores/modal_store'),
    _ = require('underscore')

module.exports = class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {shown: false, _zindex: ModalStore.getZIndex()}

        this.event(ModalStore, props.id + '.show', this.showModal.bind(this))
        this.event(ModalStore, props.id + '.hide', this.hideModal.bind(this))
        this.event(ModalStore, 'hide', this.hideModal.bind(this))
    }

    showModal (options) {
        // React can not manage the body tag directly
        // So lets "hack" it and make the body not
        // have scroll bars. Otherwise we have two sets of scroll bars
        document.body.style.overflow = 'hidden'

        this.setState({shown: true, _zindex: ModalStore.getZIndex()}, function(){
            if(_.isFunction(this.props.onShow)){
                this.props.onShow(options)
            }
        })
    }

    hideModal (options) {
        // Add the scroll bars back in for the body
        document.body.style.overflow = 'auto'

        // Remove all alerts
        AlertStore.hide()

        if(this.state.shown){
            this.setState({shown: false, zindex: ModalStore.getZIndex()}, () => {
                if(_.isFunction(this.props.onHide)){
                    this.props.onHide(options)
                }
            })
        }
        
    }

    render () {
        if(!this.state.shown) return null

        // A css id can not use dots in the name
        // but we want to keep the event namespace the
        // same as all the other components which uses dots
        var id = this.props.id.replace(/\./g, '-')

        return (
            <div id={id} style={{zIndex: this.state.zindex}} class="modal" tabIndex="-1" role="dialog" aria-labelledby="modal_label" aria-hidden="true">
                <div class="blank">
                    <div class="blank large-12 columns">
                        <h1><div class="float-right"><a onClick={this.hideModal.bind(this)}>+</a></div>{this.props.title}</h1>
                        <div class="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}