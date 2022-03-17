import { makeStyles, alpha } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    sidebaritems : { 
        zIndex: '1',
        left: '0',
        marginLeft:'5px',
        backgroundColor:'#c2c7cd', 
        overflowX: 'hidden',
        paddingTop:'5px',
        fontFamily:'Montserrat-regular',
        '&:hover' : {
            fontFamily: 'Montserrat-bold',
        } 
    },
    container : {
        transition: '.3s ease',
        backgroundColor:'silver', 
        float:'left',
    }
}));