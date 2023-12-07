import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState();

  const printRef = useRef();

  const appendQRCode = () => {
    const fullUrl = `https://${url}`;
    setQrCodeSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${fullUrl}`
    );
  };

  return (
    <Container>
      <Head>
        <title>URL gift generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="mt-5">
        <Col sm={4}></Col>
        <Col sm={4}>
          <FormGroup>
            <Label for="urlInput">URL adresa:</Label>
            <div className="d-flex align-items-center mt-1">
              <span>https://</span>
              <Input
                id="urlInput"
                className="ms-2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </FormGroup>
          {url && (
            <div className="d-flex justify-content-end">
              <Button color="secondary" onClick={() => appendQRCode()}>
                Vložit QR kód
              </Button>
            </div>
          )}
        </Col>
        <Col sm={4}></Col>
      </Row>
      {qrCodeSrc && (
        <Container className="mt-5 d-flex flex-column align-items-center">
          <div className="" ref={printRef}>
            <img src={qrCodeSrc} />
          </div>
          <div className="mt-5">
            <ReactToPrint
              bodyClass="print-body"
              content={() => printRef.current}
              trigger={() => <Button color="primary">Tisknout</Button>}
            />
          </div>
        </Container>
      )}
    </Container>
  );
}
