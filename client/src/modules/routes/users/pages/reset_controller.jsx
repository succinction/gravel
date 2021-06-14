const React = require('react'),
    Component = require('modules/lib/component'),
    UserStore = require('modules/pages/users/stores/user_store'),
    FormLib = require('modules/lib/form'),

class Reset extends Component {

    constructor(props){

        super(props)

        this.state = {
            form: {
                _id: props.match.params._id,
                reset_password: props.match.params.reset_password,
                password: ''
            }
        }

    }

    /**
    * Handle Sign Up
    */
    handleSubmit(e){
        e.preventDefault()
        UserStore.reset(this.state.form)
    }
    
    render() {

        return (
            <div class="col-md-8 col-md-offset-2">
                <form>
                    <div class="panel panel-default margin-top-xlg">
          
                        <div class="panel-heading">
                            Reset Password
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label htmlFor="password">New Password</label>
                                <input type="password" class="form-control" onChange={FormLib.handleChange.bind(this,'password')}/>
                            </div>

                            <button onClick={this.handleSubmit.bind(this)} class="btn btn-primary">GO</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

module.exports = Reset