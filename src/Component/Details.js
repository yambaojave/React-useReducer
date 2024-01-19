import { useEffect, useReducer, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const ACTION = {
    FETCH_SELECTED_DOMAIN : 'FETCH_SELECTED_DOMAIN',
    HANDLE_CHANGE : 'HANDLE_CHANGE'
}

const detailReducer = (state, action) => {
    console.log(action)

    switch (action.type) {
        case ACTION.FETCH_SELECTED_DOMAIN:
            return action.payload ;
        case ACTION.HANDLE_CHANGE:
            return { ...state, [action.field]: action.payload}
        default:
            return 0;
    }
}



export const Details = ({ selectedCompany }) => {
  const [state, dispatch] = useReducer(detailReducer, {
    domain_id: 1,
    domain_code: "",
    domain_name: "",
    domain_bus_tradename: "",
    domain_alt_code: "",
    domain_bus_seller_type: "",
    domain_active: "",
    default_domain: "",
    domain_addedby: "",
    domain_modifiedby: "",
    domain_date_modified: "",
    oid: "",
  })

  console.log(state);

  useEffect(() => {

    if(Object.keys(selectedCompany).length !== 0)
        dispatch({ type : ACTION.FETCH_SELECTED_DOMAIN, payload: selectedCompany} );
  }, [selectedCompany]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch({
        type : ACTION.HANDLE_CHANGE,
        field : name,
        payload : value
    })
  }

  return (
    <Card className="text-start">
      <Card.Header as="h5">Company Details</Card.Header>
      <Card.Body>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Domain Code
          </span>
          <input type="text" className="form-control" name="domain_code" value={state.domain_code} onChange={handleChange}/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Domain Name
          </span>
          <input type="text" className="form-control" name="domain_name" value={state.domain_name} onChange={handleChange}/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Trade Name
          </span>
          <input type="text" className="form-control" name="tradename" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Seller Type
          </span>
          <Form.Select aria-label="Default select example" name="seller_type">
            <option disabled>Open this select menu</option>
            <option value="1">VAT Registered</option>
            <option value="2">Non-Vat Registered</option>
          </Form.Select>
          <input type="checkbox" name="active" />
          <span>Active</span>

          <input type="checkbox" name="default_domain" />
          <span>Default Domain</span>
        </div>

        <Button variant="success" className="mx-1">
          Create
        </Button>
        <Button variant="primary" className="mx-1">
          Update
        </Button>
        <Button variant="danger" className="mx-1">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
