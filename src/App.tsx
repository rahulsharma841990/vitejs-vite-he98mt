import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Navbar from './Topbar';
import { SampleContext } from './context/SampleContext';
// import './App.css';

interface Record {
  name: string;
  email: string;
}

function App() {
  const [row, setRow] = useState<Record[]>([]);
  const [formValues, setFormValues] = useState<Record>({
    name: '',
    email: '',
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createRow = () => {
    const singleData: Record = {
      name: formValues['name'],
      email: formValues['email'],
    };
    setRow((prevItems) => [...prevItems, singleData]);
    clearFormInputs();
  };

  const clearFormInputs = () => {
    setFormValues({
      name: '',
      email: '',
    });
  };

  const removeRecord = (removeIndex: number) => {
    const oldList = row;
    setRow(
      oldList.filter((item, index) => {
        return removeIndex !== index;
      })
    );
  };

  const singleRow = () => {
    return row.map((singleRecord: Record, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{singleRecord.name}</td>
          <td>{singleRecord.email}</td>
          <td>
            <a
              href="#"
              onClick={() => removeRecord(index)}
              className="btn btn-danger btn-sm"
            >
              Delete Record
            </a>
          </td>
        </tr>
      );
    });
  };

  const entryForm = () => {
    return (
      <Row>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Enter Name"
            className="mb-1 mt-3 pt-1"
            style={{ height: '45px' }}
          >
            <Form.Control
              type="text"
              name="name"
              value={formValues['name']}
              placeholder="Enter Name"
              style={{ height: '45px' }}
              onChange={handleInput}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-1 mt-3 pt-1"
            style={{ height: '45px' }}
          >
            <Form.Control
              type="text"
              name="email"
              value={formValues['email']}
              placeholder="Enter Email"
              style={{ height: '45px' }}
              onChange={handleInput}
            />
          </FloatingLabel>
        </Col>
      </Row>
    );
  };

  const changeTitle = () => {
      const {sampleValue, setSampleValue} = SampleContext;
      setSampleValue('This is sample text');
  }

  return (
    <>
      <Container>
        <Navbar />
        <Row>
          <Col className="bg-primary">Here is code</Col>
          <Col className="bg-info">Here is code</Col>
        </Row>
        {entryForm()}
        <Row>
          <Col className="mt-1">
            <Button onClick={createRow}>Add Row</Button>
            <Button className="ml-5" onClick={changeTitle}>Change Title</Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <table className="table table-bordered table-stripped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{singleRow()}</tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
