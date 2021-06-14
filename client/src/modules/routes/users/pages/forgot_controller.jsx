const React = require('react'),
    Component = require('modules/lib/component'),
    UserStore = require('modules/pages/users/stores/user_store'),
    AlertStore = require('modules/common/alerts/stores/alert_store.js'),
    FormLib = require('modules/lib/form'),

class Forgot extends Component {

    constructor(props){

        super(props)

        this.state = {
            form: {
                email: '',
                alerts: []
            }
        }
        this.event(UserStore, 'forgot.success', this.onForgotSuccess.bind(this))
    }

    onForgotSuccess(){
        AlertStore.add({type:'success', message: 'Reset email sent'})
    }

    /**
    * Handle Sign Up
    */
    handleSubmit(e){
        e.preventDefault()
        UserStore.forgot(this.state.form)
    }

    render() {

        return (
            <div class="col-md-8 col-md-offset-2 ">
                <form>
                    <div class="panel panel-default margin-top-xlg">
          
                        <div class="panel-heading">
                            Forgot Password
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" class="form-control" onChange={FormLib.handleChange.bind(this,'email')}/>
                            </div>
                        
                            <button onClick={this.handleSubmit.bind(this)} class="btn btn-primary">GO</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

module.exports = Forgot