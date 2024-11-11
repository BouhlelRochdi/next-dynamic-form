// pages/index.js
import DynamicForm from '../(components)/DynamicForm';
import homeFormConfig from '../(config-json)/homeFormConfig.json';
import loginForm from '../(config-json)/loginFormConfig.json';
import userProfileForm from '../(config-json)/userProfile.json';
import './homeStyle.css';

const Home = () => (
    <div className="home-container">
        <h1 className="title">Dynamic Form ... </h1>
        {/* <DynamicForm formConfig={homeFormConfig} />
        <DynamicForm formConfig={loginForm} /> */}
        <div className="form-wrapper">
            <DynamicForm formConfig={userProfileForm} />
        </div>
    </div>
);

export default Home;
