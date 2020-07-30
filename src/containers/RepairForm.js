import React, { Component } from 'react';
import './RepairForm.css'
//images
import autopass_image from '../images/autopass-logo.png'

// material-UI

//loading
import ReactLoading from 'react-loading';

// components
import Form from '../components/Form';
import AppTitle from '../components/AppTitle';
import SaveFooter from '../components/SaveFooter';
import { users, errors } from '../db/db';
// Liff
const liff = window.liff;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // profile: undefined,
            profile: {
                displayName: "親愛的用戶",
                userId: "",
                pictureUrl: "",
            },
            userData: {
                machines: [{
                    'machineName': '咖啡機 C-4261',
                    'machineID': 'C-4261',
                    'machineType': '咖啡機',
                    'machineTypeID': 'C001',
                    'machineProducer': '雀巢',
                },
                {
                    'machineName': '智慧販賣機 V-1564',
                    'machineID': 'V-1564',
                    'machineType': '智慧販賣機',
                    'machineTypeID': 'V001',
                    'machineProducer': '雀巢',
                }]
            },
            OS: undefined,
            loading: true,

            machine: undefined,
            condition: undefined,
            discription: "",
        };

    }

    componentDidMount() {
        liff.init({ liffId: '1654207080-9E5Ba1vl' }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: "https://allway.cardbo.info/" });
            }
        }).then(
            () => liff.getOS()
        ).then(
            () => liff.getProfile()
        ).then((profile) => {
            // const profile = {
            //     displayName: "柏志",
            //     userId: "12345",
            //     pictureUrl: "柏志",
            // }
            if (!profile) {
                window.alert("USER PROFILE ERROR!");
            } else {
                this.setState({
                    profile: {
                        displayName: profile.displayName,
                        userId: profile.userId,
                        pictureUrl: profile.pictureUrl,
                    }
                });
            }
            console.log(profile);
        }).then(() => {
            this.setState({ loading: false });
        });
    }

    formOnSubmit = () => {
        console.log("formOnSubmit")
        if (!this.state.machine || !this.state.condition) {
            window.alert("請輸入必填項目!");
        } else {
            if (this.state.OS === 'web') {
                liff.logout();
                // console.log('test')
                // console.log(`報修者:${this.state.profile.lineId}, 報修機器:${this.state.machine}, 情況簡述:${this.state.condition}, 其他建議:${this.state.suggestion}`);
            }
            else {
                liff.sendMessages([{
                    type: 'text',
                    text: `員工代號:${this.state.profile.userId}, 報修機器:${this.state.machine}, 狀況代號:${this.state.condition},  問題描述:${this.state.discription}`
                }]).catch(function (error) {
                    window.alert("Error sending message: " + error);
                }).then(() => {
                    liff.closeWindow();
                });
            }
        }
    }

    handleTextareaChange = (changedState) => {
        this.setState(changedState);
    }

    render() {
        if (this.state.loading) {
            // if (true) {
            return (
                <div className="my-loading">
                    <ReactLoading type={'balls'} color={'#0068b9'} height={'20vh'} width={'20vw'} />
                </div>)
        }
        else {
            return (
                <div className="select-cards-container">
                    <AppTitle
                        logo={autopass_image}
                        title={`ALLWAY Line@ 報修系統`}
                        subtitle={`${this.state.profile.displayName} 您好，歡迎使用本報修系統:`}
                    />
                    <Form
                        handleTextareaChange={this.handleTextareaChange}
                        userMachines={this.state.userData.machines}
                        errors={errors}
                        formOnSubmit={this.formOnSubmit}
                    />
                </div>
            );
        }
    }
}
export default App;
