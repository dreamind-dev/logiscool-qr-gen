import Head from "next/head";
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
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState();

  const printRef1 = useRef();
  const printRef2 = useRef();

  const appendQRCode = () => {
    const fullUrl = `https://${url}`;
    setQrCodeSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${fullUrl}`
    );
  };

  return (
    <Container className="pb-5">
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
                maxLength={255}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="text1input">Text 1:</Label>
            <div className="d-flex align-items-center mt-1">
              <Input
                id="text1input"
                className="ms-2"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                maxLength={255}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="text2input">Text 2:</Label>
            <div className="d-flex align-items-center mt-1">
              <Input
                id="text2input"
                className="ms-2"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                maxLength={255}
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
          <div className="print-cont" ref={printRef1}>
            <img className="template-img" src="/images/1.jpg" />
            <img className="qr-1" src={qrCodeSrc} />
            <span>{text1}</span>
            <span>{text2}</span>
          </div>
          <div className="mt-3">
            <ReactToPrint
              bodyClass="print-body"
              content={() => printRef1.current}
              trigger={() => <Button color="primary">Tisk</Button>}
            />
          </div>
          <hr />
          <div className="print-cont" ref={printRef2}>
            <img className="template-img" src="/images/2.jpg" />
            <img className="qr-2" src={qrCodeSrc} />
            <span>{text1}</span>
            <span>{text2}</span>
          </div>
          <div className="mt-3">
            <ReactToPrint
              bodyClass="print-body"
              content={() => printRef2.current}
              trigger={() => <Button color="primary">Tisk</Button>}
            />
          </div>
        </Container>
      )}
    </Container>
  );
}
