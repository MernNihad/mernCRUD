import axios from "axios";
import Table from "react-bootstrap/Table";
import { errorToasy, successToasy } from "./toast";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "./Form";

function DarkExample() {
  const [data, setData] = useState([]);
  const [status, setStauts] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [password, setPassword] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");

      setData(response.data.result);
    } catch (error) {
      errorToasy(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/${id}`);
      successToasy('Deleted.')
      setRefresh(!refresh)
    } catch (error) {
      errorToasy(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleAdd = () => setStauts(!status);

  return (
    <>
      <Button variant="success" onClick={handleAdd}>
        Add
      </Button>{" "}
      {status ? (
        <>
          <Form setRefresh={setRefresh} refresh={refresh} />
        </>
      ) : (
        <>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Passwrod</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ email, password, _id }, index) => {
                return (
                  <>
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{email}</td>
                      <td>{password}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(_id)}
                        >
                          Danger
                        </Button>
                      </td>
                    </tr>
                    ;
                  </>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default DarkExample;
