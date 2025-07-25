import React, { useEffect, useRef, useContext } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { PayingBarOpenContext } from '../../State/PayingBarOpenState';
import { Container, Row, Col } from 'react-bootstrap';

const GnbPayingBarLoginT = () => {
  const { isOpen } = useContext(PayingBarOpenContext);
  const qrRef = useRef(null);
  const scannerRef = useRef(null);
  const lastScannedTextRef = useRef("");

  useEffect(() => {
    if (isOpen && qrRef.current) {
      const html5QrCode = new Html5Qrcode("qr-reader");

      html5QrCode.start(
          { facingMode: "environment" }, // 후면 카메라
          {
            fps: 10,
            qrbox: (w, h) => {
              const minEdge = Math.min(w, h) * 0.6;
              const size = Math.floor(minEdge);
              return { width: size, height: size };
            },
          },
          (decodedText) => {
            // 중복 QR 처리 방지 (옵션)
            if (decodedText !== lastScannedTextRef.current) {
              lastScannedTextRef.current = decodedText;
              alert(`스캔 성공: ${decodedText}`);
            }
          },
          (errorMessage) => {
            // 인식 실패 로그 (선택 사항)
            console.log("QR 인식 실패:", errorMessage);
          }
      );

      scannerRef.current = html5QrCode;
    }

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch((e) => {
          console.warn("스캐너 종료 실패:", e);
        });
      }
    };
  }, [isOpen]);

  return (
      <div style={{ display: `${isOpen ? 'flex' : 'none'}` }} className="GNBPBBox">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <h5 className="d-flex justify-content-center align-content-center" style={{ color: 'white' }}>
                QR 결제 스캔
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <div ref={qrRef}>
                <div id="qr-reader" className="qr-reader"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default GnbPayingBarLoginT;
