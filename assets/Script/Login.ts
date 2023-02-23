import { _decorator, Component, director, EditBox, Input, Node, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {
    @property({ type: Node })
    userName = null;

    @property({ type: Node })
    password = null;

    @property({ type: Node })
    logInButton: Node;


    onLoad(): void {
        this.logInButton.on(Input.EventType.TOUCH_START, this.fetchUserData, this);
    }
    start() {
    }


    fetchUserData() {
        let username = this.userName.getComponent(EditBox).string
        let password = this.password.getComponent(EditBox).string
        let userNameCheck = this.userNameValidation(username);
        let passwordCheck = this.passwordValidation(password);
        console.log(userNameCheck, passwordCheck);
        if (userNameCheck && passwordCheck) {
            this.userRequest(username, password)
        } else {
            if (!userNameCheck) {
                console.log("Invalid Username");
            } else if (!passwordCheck) {
                console.log("Invalid Password");

            }
        }

    }

    userRequest(username, password) {
        let xhttp = new XMLHttpRequest();
        let body =
        {
            email: username,
            password: password
        }



        let method = "POST";
        let url = "http://3.18.231.59:4002/v1/user/login";
        let apiKey = "HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR"
        xhttp.open(method, url, true);
        xhttp.setRequestHeader("apiKey", apiKey);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState != 4) {
                return;
            }
            let data = xhttp.response
            director.loadScene("Welcome");
        }
        xhttp.send(JSON.stringify(body));
    }



    userNameValidation(input) {
        let regex = new RegExp("[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?");
        return regex.test(input)
    }

    passwordValidation(input) {
        let regex = new RegExp("[0-9]");
        return regex.test(input);
    }

    update(deltaTime: number) {

    }
}

