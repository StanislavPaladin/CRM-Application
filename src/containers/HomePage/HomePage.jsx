import PropTypes from 'prop-types';
import Button from "@mui/material/Button"

import styles from "./HomePage.module.css";

const HomePage = () => {
    return (
        <>
            HomePage
            <Button variant="contained">Hello World</Button>
        </>
    );
}

HomePage.propTypes = {
     propName: PropTypes.string
}

export default HomePage;
