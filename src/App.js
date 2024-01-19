import { useEffect, useReducer } from 'react';
import './App.css';
import companyJson from './company.json'
import { Domain } from './Component/Domain';
import { Col, Row } from 'react-bootstrap';
import { Details } from './Component/Details';


const ACTION = {
  FETCH_START : 'FETCH_START',
  FETCH_SUCCESS : 'FETCH_SUCCESS',
  FETCH_ERROR : 'FETCH_ERROR',
  SELECTED_STATE : 'SELECTED_STATE'
}


const companyReducer = (state, action) => {

  switch (action.type) {
    case ACTION.FETCH_START:
      return { ...state, loading: true, error: null};
    case ACTION.FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ACTION.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACTION.SELECTED_STATE:
      return { ...state, data: { ...state.data, selectedState: state.data.state.find((c) => c.domain_id === action.payload)}}
    default:
      return state;
  }
}


function App() {

  const initialStateCompany = {
    data: null,
    loading: true,
    error: null
  }

  const [stateCompany, dispatchCompany] = useReducer(companyReducer, initialStateCompany)

  useEffect(() => {
    const fetchData = () => {
      try{
        dispatchCompany({ type: ACTION.FETCH_START });
        const companyResult = companyJson;
        const state = {
          state : companyResult,
          selectedState : {}
        }
        dispatchCompany({ type: ACTION.FETCH_SUCCESS, payload: state})
      }
      catch(error){
        console.log('Error fetching data:', error);
        dispatchCompany({ type: ACTION.FETCH_ERROR, payload: 'ERROR fetching data'})
      }
    }
    fetchData();
  }, [])

  console.log(stateCompany.data?.selectedState)

  return (
    <div className="App">
      {
        stateCompany.loading ? 
          <div>Loading...</div>
          :
        stateCompany.error ?
          <div>{stateCompany.error}</div>
          :
          <Row>
            <Col>
              <Domain company={stateCompany.data?.state} setSelectedCompany={(id) => dispatchCompany({type: ACTION.SELECTED_STATE, payload: id})}/>
            </Col>
            <Col>
              <Details selectedCompany={stateCompany.data?.selectedState}/>
            </Col>
          </Row>
      }
    </div>
  );
}

export default App;
