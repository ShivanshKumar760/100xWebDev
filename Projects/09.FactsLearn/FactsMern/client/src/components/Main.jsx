import MainSection from "./subcomponents/MainSection"
import Sidebar from "./subcomponents/Sidebar"
import PropTypes from 'prop-types';

const Main = ({facts,setFacts,setFetchTrigger}) => {
  return (
    <main className="">
        <Sidebar facts={facts} setFacts={setFacts}/>
        <MainSection facts={facts} setFacts={setFacts} setFetchTrigger={setFetchTrigger}/>
    </main>
  )
}
Main.propTypes = {
  facts: PropTypes.array.isRequired,
  setFacts: PropTypes.func.isRequired,
  setFetchTrigger: PropTypes.func.isRequired,
};

export default Main;