const Footer=()=>{

    const date=new Date();
    const getYear=date.getFullYear();
    console.log(getYear);

    return(
    <footer>
        <p>Copyright @ {getYear}</p>
    </footer>    
    );

};

export default Footer;