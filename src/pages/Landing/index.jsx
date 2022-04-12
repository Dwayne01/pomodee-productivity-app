import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Landing = () => {

const landingStyle = {
    background: 'url(images/landingPage.png) no-repeat center fixed',
    backgroundSize: 'contain',
    width: 'auto',
    height: 700
};

const landingBtnStyle = {
    position: 'fixed',
    top: '89%',
    left: '44%',
    backgroundColor: '#3928B1',
    fontFamily: 'sans-serif',
    fontWeight: 600
}  


    return (
        <div className="landingPage" style={landingStyle}> 
            <Link to="/home" className="toHome">
                <Button variant="primary" size="lg" style={landingBtnStyle}>
                    Explore Now</Button>
            </Link>
        </div>
        
    );
}

export default Landing;



