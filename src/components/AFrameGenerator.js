import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "aframe";

const AFrameGenerator = () => {
  const [entities, setEntities] = useState([]);
  const [componentType, setComponentType] = useState("box");
  const [color, setColor] = useState("#FF0000");
  const [depth, setDepth] = useState("1");
  const [height, setHeight] = useState("1");
  const [width, setWidth] = useState("1");
  const [sphereRadius, setSphereRadius] = useState("1");
  const [cylinderRadius, setCylinderRadius] = useState("1");
  const [cylinderHeight, setCylinderHeight] = useState("1");
  const [coneRadiusBottom, setConeRadiusBottom] = useState("1");
  const [coneRadiusTop, setConeRadiusTop] = useState("0.5");
  const [coneHeight, setConeHeight] = useState("1");
  const [position, setPosition] = useState("0 1.5 -3");

  // State variables for a-camera, a-plane, a-light, and a-sky
  const [cameraPosition, setCameraPosition] = useState("0 1.6 4");
  const [planeWidth, setPlaneWidth] = useState("10");
  const [planeHeight, setPlaneHeight] = useState("10");
  const [planeColor, setPlaneColor] = useState("#7BC8A4");
  const [planeRotation, setPlaneRotation] = useState("0 0 0");
  const [skyColor, setSkyColor] = useState("#ECECEC");
  const [ambientLightColor, setAmbientLightColor] = useState("#FFF");
  const [directionalLightColor, setDirectionalLightColor] = useState("#FFF");
  const [directionalLightPosition, setDirectionalLightPosition] =
    useState("1 2 3");
  const [directionalLightIntensity, setDirectionalLightIntensity] =
    useState("0.5");

  // Shadow properties
  const [castShadow, setCastShadow] = useState(false);
  const [receiveShadow, setReceiveShadow] = useState(false);

  // State for manual code editing
  const [manualCode, setManualCode] = useState("");

  const handleAddEntity = () => {
    const newEntity = {
      componentType,
      color,
      position,
      castShadow,
      receiveShadow,
    };

    if (componentType === "box") {
      newEntity.depth = depth;
      newEntity.height = height;
      newEntity.width = width;
    } else if (componentType === "cylinder") {
      newEntity.cylinderRadius = cylinderRadius;
      newEntity.cylinderHeight = cylinderHeight;
    } else if (componentType === "cone") {
      newEntity.coneRadiusBottom = coneRadiusBottom;
      newEntity.coneRadiusTop = coneRadiusTop;
      newEntity.coneHeight = coneHeight;
    } else if (componentType === "sphere") {
      newEntity.sphereRadius = sphereRadius;
    }

    setEntities([...entities, newEntity]);

    // Reset fields
    setComponentType("box");
    setColor("#FF0000");
    setDepth("1");
    setHeight("1");
    setWidth("1");
    setSphereRadius("1");
    setCylinderRadius("1");
    setCylinderHeight("1");
    setConeRadiusBottom("1");
    setConeRadiusTop("0.5");
    setConeHeight("1");
    setPosition("0 1.5 -3");
    setCastShadow(false);
    setReceiveShadow(false);
  };

  const handleGenerate = () => {
    const entitiesHtml = entities
      .map((entity) => {
        const {
          componentType,
          color,
          position,
          depth,
          height,
          width,
          sphereRadius,
          cylinderRadius,
          cylinderHeight,
          coneRadiusBottom,
          coneRadiusTop,
          coneHeight,
          castShadow,
          receiveShadow,
        } = entity;
        const shadowProps =
          castShadow || receiveShadow
            ? `castShadow="${castShadow}" receiveShadow="${receiveShadow}"`
            : "";
        switch (componentType) {
          case "box":
            return `<a-box color="${color}" depth="${depth}" height="${height}" width="${width}" position="${position}" ${shadowProps}></a-box>`;
          case "sphere":
            return `<a-sphere color="${color}" radius="${sphereRadius}" position="${position}" ${shadowProps}></a-sphere>`;
          case "cylinder":
            return `<a-cylinder color="${color}" radius="${cylinderRadius}" height="${cylinderHeight}" position="${position}" ${shadowProps}></a-cylinder>`;
          case "cone":
            return `<a-cone color="${color}" radius-bottom="${coneRadiusBottom}" radius-top="${coneRadiusTop}" height="${coneHeight}" position="${position}" ${shadowProps}></a-cone>`;
          default:
            return "";
        }
      })
      .join("\n");

    const sceneHtml = `
<html>
  <head>
    <meta charset="utf-8">
    <title>A-Frame Scene</title>
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-sky color="${skyColor}"></a-sky>
      <a-light type="ambient" color="${ambientLightColor}"></a-light>
      <a-light type="directional" position="${directionalLightPosition}" intensity="${directionalLightIntensity}" color="${directionalLightColor}"></a-light>
      <a-plane rotation="${planeRotation}" width="${planeWidth}" height="${planeHeight}" color="${planeColor}"></a-plane>
      <a-camera position="${cameraPosition}"></a-camera>
      ${entitiesHtml}
    </a-scene>
  </body>
</html>
    `;

    setManualCode(sceneHtml);
  };

  const handleDownload = () => {
    const blob = new Blob([manualCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aframe-scene.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setEntities([]);
    setComponentType("box");
    setColor("#FF0000");
    setDepth("1");
    setHeight("1");
    setWidth("1");
    setSphereRadius("1");
    setCylinderRadius("1");
    setCylinderHeight("1");
    setConeRadiusBottom("1");
    setConeRadiusTop("0.5");
    setConeHeight("1");
    setPosition("0 1.5 -3");
    setCameraPosition("0 1.6 4");
    setPlaneWidth("10");
    setPlaneHeight("10");
    setPlaneColor("#7BC8A4");
    setPlaneRotation("0 0 0");
    setSkyColor("#ECECEC");
    setAmbientLightColor("#FFF");
    setDirectionalLightColor("#FFF");
    setDirectionalLightPosition("1 2 3");
    setDirectionalLightIntensity("0.5");
    setCastShadow(false);
    setReceiveShadow(false);
    setManualCode("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>A-Frame Generator</h1>
          <Form>
            <Form.Group controlId="formComponentType">
              <Form.Label>Component Type</Form.Label>
              <Form.Control
                as="select"
                value={componentType}
                onChange={(e) => setComponentType(e.target.value)}
              >
                <option value="box">Box</option>
                <option value="sphere">Sphere</option>
                <option value="cylinder">Cylinder</option>
                <option value="cone">Cone</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            {componentType === "box" && (
              <>
                <Form.Group controlId="formDepth">
                  <Form.Label>Depth</Form.Label>
                  <Form.Control
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formHeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formWidth">
                  <Form.Label>Width</Form.Label>
                  <Form.Control
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </Form.Group>
              </>
            )}

            {componentType === "sphere" && (
              <Form.Group controlId="formSphereRadius">
                <Form.Label>Radius</Form.Label>
                <Form.Control
                  type="number"
                  value={sphereRadius}
                  onChange={(e) => setSphereRadius(e.target.value)}
                />
              </Form.Group>
            )}

            {componentType === "cylinder" && (
              <>
                <Form.Group controlId="formCylinderRadius">
                  <Form.Label>Radius</Form.Label>
                  <Form.Control
                    type="number"
                    value={cylinderRadius}
                    onChange={(e) => setCylinderRadius(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCylinderHeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    value={cylinderHeight}
                    onChange={(e) => setCylinderHeight(e.target.value)}
                  />
                </Form.Group>
              </>
            )}

            {componentType === "cone" && (
              <>
                <Form.Group controlId="formConeRadiusBottom">
                  <Form.Label>Radius Bottom</Form.Label>
                  <Form.Control
                    type="number"
                    value={coneRadiusBottom}
                    onChange={(e) => setConeRadiusBottom(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formConeRadiusTop">
                  <Form.Label>Radius Top</Form.Label>
                  <Form.Control
                    type="number"
                    value={coneRadiusTop}
                    onChange={(e) => setConeRadiusTop(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formConeHeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    value={coneHeight}
                    onChange={(e) => setConeHeight(e.target.value)}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="x y z"
              />
            </Form.Group>

            <Form.Group controlId="formCastShadow">
              <Form.Check
                type="checkbox"
                label="Cast Shadow"
                checked={castShadow}
                onChange={(e) => setCastShadow(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="formReceiveShadow">
              <Form.Check
                type="checkbox"
                label="Receive Shadow"
                checked={receiveShadow}
                onChange={(e) => setReceiveShadow(e.target.checked)}
              />
            </Form.Group>

            {/* Additional controls for a-camera */}
            <Form.Group controlId="formCameraPosition">
              <Form.Label>Camera Position</Form.Label>
              <Form.Control
                type="text"
                value={cameraPosition}
                onChange={(e) => setCameraPosition(e.target.value)}
                placeholder="x y z"
              />
            </Form.Group>

            {/* Additional controls for a-plane */}
            <Form.Group controlId="formPlaneWidth">
              <Form.Label>Plane Width</Form.Label>
              <Form.Control
                type="number"
                value={planeWidth}
                onChange={(e) => setPlaneWidth(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPlaneHeight">
              <Form.Label>Plane Height</Form.Label>
              <Form.Control
                type="number"
                value={planeHeight}
                onChange={(e) => setPlaneHeight(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPlaneColor">
              <Form.Label>Plane Color</Form.Label>
              <Form.Control
                type="color"
                value={planeColor}
                onChange={(e) => setPlaneColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPlaneRotation">
              <Form.Label>Plane Rotation</Form.Label>
              <Form.Control
                type="text"
                value={planeRotation}
                onChange={(e) => setPlaneRotation(e.target.value)}
                placeholder="x y z"
              />
            </Form.Group>

            {/* Additional controls for a-sky */}
            <Form.Group controlId="formSkyColor">
              <Form.Label>Sky Color</Form.Label>
              <Form.Control
                type="color"
                value={skyColor}
                onChange={(e) => setSkyColor(e.target.value)}
              />
            </Form.Group>

            {/* Additional controls for a-light */}
            <Form.Group controlId="formAmbientLightColor">
              <Form.Label>Ambient Light Color</Form.Label>
              <Form.Control
                type="color"
                value={ambientLightColor}
                onChange={(e) => setAmbientLightColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDirectionalLightColor">
              <Form.Label>Directional Light Color</Form.Label>
              <Form.Control
                type="color"
                value={directionalLightColor}
                onChange={(e) => setDirectionalLightColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDirectionalLightPosition">
              <Form.Label>Directional Light Position</Form.Label>
              <Form.Control
                type="text"
                value={directionalLightPosition}
                onChange={(e) => setDirectionalLightPosition(e.target.value)}
                placeholder="x y z"
              />
            </Form.Group>

            <Form.Group controlId="formDirectionalLightIntensity">
              <Form.Label>Directional Light Intensity</Form.Label>
              <Form.Control
                type="number"
                value={directionalLightIntensity}
                onChange={(e) => setDirectionalLightIntensity(e.target.value)}
              />
            </Form.Group>

            <Button
              className="me-3 my-3"
              variant="primary"
              onClick={handleAddEntity}
            >
              Add Entity
            </Button>
            <Button
              className="me-3 my-3"
              variant="secondary"
              onClick={handleGenerate}
            >
              Generate Scene
            </Button>
            <Button
              className="me-3 my-3"
              variant="danger"
              onClick={handleDownload}
            >
              Download Scene
            </Button>
            <Button
              className="me-3 my-3"
              variant="warning"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formManualCode">
            <Form.Label>Manual Code</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
          </Form.Group>
          <div id="aframe-scene" style={{ height: "100vh", overflow: "auto" }}>
            <iframe
              title="A-Frame Scene"
              srcDoc={manualCode}
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid black",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AFrameGenerator;
