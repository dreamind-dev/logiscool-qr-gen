import Head from "next/head";
import { useEffect, useRef, useState } from "react";
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
  const [qrCodeSrc2, setQrCodeSrc2] = useState();
  const [qrSvg, setQrSvg] = useState();
  const [qrSvg2, setQrSvg2] = useState();

  const printRef1 = useRef();
  const printRef2 = useRef();

  const appendQRCode = () => {
    const fullUrl = `${url}`;
    setQrCodeSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=110x110&color=cdd500&format=svg&data=${fullUrl}`
    );
    setQrCodeSrc2(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=ffffff&format=svg&data=${fullUrl}`
    );
  };

  useEffect(() => {
    if (!qrCodeSrc) return;
    (async () => {
      const out = await fetch(qrCodeSrc).then((res) => res.text());
      setQrSvg(out.replace(`<?xml version="1.0" standalone="no"?>`, ""));
    })();
  }, [qrCodeSrc]);
  useEffect(() => {
    if (!qrCodeSrc2) return;
    (async () => {
      const out = await fetch(qrCodeSrc2).then((res) => res.text());
      setQrSvg2(out.replace(`<?xml version="1.0" standalone="no"?>`, ""));
    })();
  }, [qrCodeSrc2]);

  return (
    <Container className="pb-5">
      <Head>
        <title>Logiscool giftcard generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="mt-5">
        <Col sm={4}></Col>
        <Col sm={4}>
          <FormGroup>
            <Label for="urlInput">URL adresa:</Label>
            <div className="d-flex align-items-center mt-1">
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
      {true && (
        <Container className="mt-5 d-flex flex-column align-items-center">
          <div className="print-cont template1" ref={printRef1}>
            <img className="template-img" src="/images/1.jpg" />
            <div
              className="qr"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            ></div>
            <div className="text1-cont">
              <span className="text1">
                {text1}
                <span className="text2">- {text2}</span>
              </span>
            </div>
          </div>
          <div className="mt-3">
            <ReactToPrint
              bodyClass="print-body"
              content={() => printRef1.current}
              trigger={() => <Button color="primary">Tisk</Button>}
            />
          </div>
          <hr />
          <div className="print-cont template2" ref={printRef2}>
            <img className="template-img" src="/images/2.jpg" />
            <div
              className="qr"
              dangerouslySetInnerHTML={{ __html: qrSvg2 }}
            ></div>
            <div className="text2-cont">
              <span className="text1">{text1}</span>
            </div>
            <span className="text2">Přeje: {text2}</span>
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
