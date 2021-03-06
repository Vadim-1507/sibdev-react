import React, {Component} from "react";
import {connect} from "react-redux";
import {EnterUserAction} from '../../redux/action';
import './login.css';

class LogIn extends Component {
    state = {
        error: false,
        name: '',
        password: '',
        seePassword: false
    }

    showPassword = e => {
        e.preventDefault();
        const seePassword = !this.state.seePassword;
        this.setState({seePassword});
    }

    handlerName = e => {
        const value = e.target.value;
        this.setState({name: value});
    }

    handlerPassword = e => {
        const value = e.target.value;
        this.setState({password: value});
    }

    clickLogIn = () => {
        let user = {...this.props.user};
        const name = this.state.name,
            password = this.state.password;

        if (name === "admin" && password === "admin123") {
            localStorage.setItem('token', 'qwertyuiop123');
            user = {...user, token: 'qwertyuiop123'};
            this.setState({error: false});
        } else if (name === "user" && password === "user123") {
            localStorage.setItem('token', 'asdfghjkla783');
            user = {...user, token: 'asdfghjkla783'};
            this.setState({error: false});
        } else {
            this.setState({error: true});
        }
        this.props.clickLogIn(user);
    }

    render() {
        let type = 'password',
            classEye = 'eye';
        const error = this.state.error ? 'block' : 'none';


        if (this.state.seePassword) {
            type = 'text';
            classEye = 'eye active';
        }

        return (
            <div className="modal_log_wr">
                <div className='modalLog'>
                    <div className='logo_wrapper'>
                    </div>

                    <h3 className='title_log-in'>Вход</h3>

                    <form action="authorization">
                        <span className='error_text' style={{display: error}}>Неверный Логин или пароль</span>
                        <div className="input_wrapper">
                            <label> Логин
                                <input type="text" className='input_auth user' placeholder='login'
                                       onChange={(e) => this.handlerName(e)}/>
                            </label>
                        </div>

                        <div className="input_wrapper">
                            <label> Пароль
                                <input type={type} className='input_auth pass' placeholder='password'
                                       onChange={(e) => this.handlerPassword(e)}/>
                                <button className={classEye} onClick={e => this.showPassword(e)}></button>
                            </label>
                        </div>

                        <div className="btn_wrapper">
                            <button className='btn_authorization' onClick={this.clickLogIn}>Вход</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickLogIn: (data) => dispatch(EnterUserAction(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
